const express = require('express');
const bodyParser = require('body-parser');
const https = require('https');
const { response } = require('express');
const mongoose = require('mongoose');
// const { WSAEWOULDBLOCK } = require('constants');
var assert = require('assert');
const { on } = require('events');
const validator = require('validator');

const port = 8080;

//MONGOOSE////////////////////
const uri = 'mongodb://localhost:27017/itrust';
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('itrustdb connected');
});

//Users Schema w/ server side validation
const userSchema = new mongoose.Schema({ 
  firstname: { 
    type: String, 
    minlength: [3, 'first name must be at least 3 characters'], 
    required: [true, 'enter First Name'] //checks this mongoose validation kind 2nd
  }, 
  lastname: {
    type: String,
    required: [true, "A last name must be entered"]
  },
  email:  {
    type: String,
    validate(value){ //to validate value aswell as type above
      if(!validator.isEmail(value)){
        throw new Error("Email is not valid");
      }
    }
  },
  country:  {
    type: String,
    required: [true, 'Country required']
  },
  password: { //TOFIX
    type: String,
    minlength: [8, 'Password must have at least 8 charaters. You gave {VALUE}.']
  },
  password2:  {
    type: String,
    validate(value){
      if(!validator.equals(value, this.password)){
        throw new Error("Your passwords do not match");
      }
    } 
  },
  address:  {
    type: String,
    required: [true, 'address required']
  },
  address2: String,
  city:  {
    type: String,
    required: [true, 'City required']
  },
  state:  {
    type: String,
    enum: ['VIC', 'NSW', 'QLD', 'WA', 'SA', 'TAS', 'ACT', 'NT']
  },
  phoneNumber: String,
  zip: Number,
  terms: {
    type: String,
    required: [true, 'terms must be agreed to']
  }
});

//Create User Model/Class
const User = mongoose.model('User', userSchema);


let app = express();
app.use(bodyParser.urlencoded({extended: true})); 
//makes things static from html (like css path)

app.use(express.static('public')); 

const base= `${__dirname}/public`;

app.get('/', (req, res)=>{
  // let logUsers = User.find({});
  // console.log(logUsers);
  res.sendFile(__dirname + "/index.html");
})

app.post('/' ,(req, res)=> {
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

    //TOFIX**????
  // let error = newUser.validateSync();
  // assert.equal(error.errors['firstname'].message,'Your first name is required.');
  // assert.equal(error.errors['password'].message, 'Password must be at least 8 characters')

  //save new user to db
  newUser.save((err)=>{
    err ? console.log(err) : console.log('New User Inserted Succesfully')
  })

  //get body form fields for mailchimp
  let firstname = req.body.firstname;
  let lastname = req.body.lastname;
  let email = req.body.email;

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
  //create request to mailchimp w/ https
  const request = https.request(url, options, (res)=>{
    res.on('data', (data)=>{
      console.log(JSON.parse(data))
    })
  })
  //pass in new user in JSON format
  // request.write(jsonData)   // enable mc
  // request.end()
  console.log(firstname, lastname, email);
  //redirect to home/welcome page - or dashboard. 
  res.redirect(`/welcome.html`)
})

//error page with catch all
app.get('/*', (req, res)=>{
  res.sendFile(`${base}/404.html`)
})

app.listen(port, (req, res)=>{
  console.log(`Server is running on port: ${port}`);
}) 



//single mongoose entry example
///////////////////////////////////
// const user = new User({
//   firstname: 'Bob',
//   lastname: 'Dalgleesh',
//   email: 'something@wew.com',
//   country: 'Australia',
//   password: 'abadpassword',
//   address: 'line 1',
//   address2: 'line 2',
//   city: 'Melbourne',
//   state: 'VIC',
//   phoneNumber: '0408556655',
//   zip: '3000'
// });

// user.save((err)=>{
//   err ? console.log(err) : console.log('User Inserted Succesfully')
// })

