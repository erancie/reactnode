const express = require('express');
const bodyParser = require('body-parser');
const https = require('https');
const { response } = require('express');
const mongoose = require('mongoose');
const validator = require('validator');
// import userSchema from './models/User.mjs'; //how to use import?
const User = require('./models/User');
const un, pw, dbt = require('./passes')


//MONGOOSE////////////////////
const uri = `mongodb+srv://${un}:${pw}@main.hzw1z.mongodb.net/${dbt}?retryWrites=true&w=majority`;
// const uri = 'mongodb://localhost:27017/itrust';
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('main db connected');
});



//Create User Model/Class
// const User = mongoose.model('User', userSchema);


//EXPRESS////////////////
// const port = 8080;

let app = express();
app.use(bodyParser.urlencoded({extended: true})); 
//makes things static from html (like css path)

app.use(express.static('public')); 

const base= `${__dirname}/public`;

app.get('/', (req, res)=>{ //might need to change home route
  res.sendFile(base + "/register.html");
})

app.get('/login', (req, res) =>{
  res.sendFile(base + "/login.html")
})

app.post('/login', (req, res)=> {
  let email = req.body.email;
  let password = req.body.password;


  //check email exists and password matches that email
  if(email && password){
    //Check hashed password here?
    console.log(`Email: ${email} Password: ${password}`);
    res.redirect('/welcome.html');
  }
  else{
    res.redirect('/invalid.html');
    throw new Error('invalid email or password.');
  }

})

app.post('/', (req, res)=> {

  //Hash password here?

  //create new user from body parser
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
  let firstname = req.body.firstname;
  let lastname = req.body.lastname;
  let email = req.body.email;
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

  //pass in new user in JSON format
  request.write(jsonData)   // enable API Key & uncomment to enable mailchimp
  request.end()

  //redirect to home/welcome page - or dashboard. 
  if(res.statusCode === 200){
    res.redirect('/login.html') //redirect uses public folder
  }else{   //front end error //**TO FIX** - only sends status 200
    res.redirect('/404.html')
  }
})

//error page with catch all
app.get('/*', (req, res)=>{
  res.sendFile(`${base}/404.html`) //sendFile requiresd base directory
})

//HEROKU PORT/////////////
let port = process.env.PORT;
if (port == null || port == "") {
  port = 8080;
}

app.listen(port, (req, res)=>{
  console.log(`Server is running on port: ${port}`);
}) 
