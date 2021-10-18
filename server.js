//TEST

const express = require('express');
const bodyParser = require('body-parser');
const https = require('https');
const { response } = require('express');
const mongoose = require('mongoose');
const validator = require('validator');
const User = require('./models/User');
const Expert = require('./models/Expert');//
const Task = require('./models/Task');
const bcrypt = require('bcrypt');
const { send } = require('process');
// import User from './models/User.mjs'; //how to use import?

//MONGOOSE////////////////////
const uri = `mongodb+srv://admin-elliot:deakin2021@main.hzw1z.mongodb.net/main?retryWrites=true&w=majority`;
// const uri = 'mongodb://localhost:27017/itrust';
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('main db connected');
});

//EXPRESS////////////////
let app = express();
app.use(bodyParser.urlencoded({extended: true})); 
//makes things static from html (like css path)
app.use(express.static('public')); 

const base= `${__dirname}/public`;

app.get('/', (req, res)=>{    //will need to change home route to landing
  res.sendFile(base + "/register.html");
})

// LOGIN ////////////////////////////////
app.get('/login', (req, res) =>{
  res.sendFile(base + "/login.html")
})

app.post('/login', (req, res)=> {
  //find user according to email 
  //if exists, compare form password to user password 
  const {email, password} = req.body;
  User.findOne({ email: email}, (e, user)=>{
    if (e) { res.send("No such email.") }                       //TOFIX - handle no email err
    else{
      bcrypt.compare(password, user.password, (e, result)=>{
        if (result) { //bool
          console.log("Password compare : " + result)
          res.redirect('/welcome')
        }else{
          console.log("Password compare : " + result)//false
          res.send("Incorrect password")
        }
      })
    }
  })
})

//welcome page////////////////////////////
app.get('/welcome', (req, res)=> {
  res.sendFile(base + "/welcome.html")
  
})

//HOME - Register ////////////////////////
app.post('/', (req, res)=> { //will change route to /register.
  //create new user from body fields
  const newUser = new User({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    country: req.body.country,
    password: req.body.password,
    password2: req.body.password2,
    address: req.body.address,
    address2: req.body.address2,
    city: req.body.city,
    state: req.body.state,
    phoneNumber: req.body.phone_number,
    zip: req.body.zip,
    terms: req.body.terms
  });

  //save new user to db
  newUser.save((err)=>{
    err ? console.log(err) : console.log('New User Inserted Succesfully')
  })

  //MAILCHIMP//////////////
  //get body form fields for mailchimp
  let {firstname, lastname, email} = req.body;
  console.log(firstname, lastname, email);

  //mailchimp api key
  const apiKey = '4cf53003ebc05f4c27f8a03b9338c6fa-us5';
  //mailchimp audience/list id
  const listId = '5f7ec9e7d7';
  //url to your list
  const url = `https://us5.api.mailchimp.com/3.0/lists/${listId}`
  const options = {
    method: "POST",
    auth: `mystring:${apiKey}`
  } 
  //create request to mailchimp w/ https
  const request = https.request(url, options, (res)=>{
    res.on('data', (data)=>{
      console.log(JSON.parse(data))
    })
  })
  //create request mailchimp obj with body fields
  const data = {
    members:[
      {
        email_address: email,
        status: 'subscribed',
        merge_fields:{
          FNAME: firstname,
          LNAME: lastname
        }
      }
    ]
  }
  //convert to JSON format
  jsonData = JSON.stringify(data);
  // //pass in new user in JSON format
  // request.write(jsonData)   // enable API Key & uncomment to enable mailchimp
  // request.end()

  //redirect to home/welcome page - or dashboard. 
  if(res.statusCode === 200){
    res.redirect('/login.html') //redirect uses public folder
  }else{   //front end error //**TO FIX** - only sends status 200
    res.redirect('/404.html')
  }
})//end post /

//delete all users (take this endpoint out of API?)
app.delete('/users', (req, res)=>{
  User.deleteMany((err)=>{
    if (err) res.send(err)
    else res.send('Deleted all users.')
  })
})

//////////// EXPERT API //////// TASK 6.1P ////////////////  

//get all experts
app.route('/experts')
.get((req, res)=>{
  // res.sendFile(base + '/experts.html')
  Expert.find((err, expertList)=>{
    if(err) res.send(err)
    else res.send(expertList)
  })
})
//add new expert
.post((req, res)=>{
  const expert = new Expert({
    name: req.body.name, 
    address: req.body.address, 
    mobile: req.body.mobile, 
    password: req.body.password}); 

  expert.save((err, newExpert)=>{
    if(newExpert) res.send(newExpert)
    else res.send(err)
  })
})
//delete all experts
.delete((req, res)=>{
  Expert.deleteMany((err)=>{
    if (err) res.send(err)
    else res.send('Deleted all experts.')
  })
})
////------------- >  item  ename
app.route('/experts/:ename')
//retreive expert
.get((req, res)=>{
  let name = req.params.ename
  Expert.find({name: name}, (err, expert)=>{
    if(err) res.send(err)
    else {
      console.log(expert)
      res.send(expert)
    }
  })
})
//update expert name
.put((req, res)=>{
  Expert.updateOne(
    { name: req.params.ename }, //condition
    { name: req.body.name },  // new name
    // {overwrite: false}, //true clears other fields
    (err)=>{
      if (err) res.send(err)
      else res.send(`Updated name`)
    }  
  )
})
//update expert address, mobile, password
.patch((req, res)=>{
  Expert.updateMany( 
    {name: req.params.ename},
    {$set: req.body }, //updates all requested in body of req.
    (err)=>{
      if(!err) res.send('Expert update successful')
      else res.send(err)
    }
  )
})
//remove expert
.delete((req, res)=>{
  let name = req.params.ename
  Expert.deleteOne({name: name}, (err)=>{
    if(err) res.send(err)
    else res.send(`${name} deleted. `)
  })
})

////////////////////////////////////////////
//way to import api modules to server.js?***

///// USER API ////////////**next**/
app.get('/users', (req,res)=>{
  User.find({}, (err, users)=>{
    if(err) send(err)
    else res.send(users)
  })
})
//error page with catch all/////////////////
app.get('/*', (req, res)=>{
  res.sendFile(`${base}/404.html`) //sendFile requiresd base directory
})

//HEROKU PORT///////////////////////////////
let port = process.env.PORT;
if (port == null || port == "") {
  port = 8080;
}

app.listen(port, (req, res)=>{
  console.log(`Server is running on port: ${port}`);
}) 
