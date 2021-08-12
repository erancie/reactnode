const express = require('express');
const bodyParser = require('body-parser');
const https = require('https');
const { response } = require('express');

const app = express();
const port = 8080;

app.use(bodyParser.urlencoded({extended: true})); 
//makes things static from html (like css path)
app.use(express.static('public')); 

const base= `${__dirname}/public`;

app.get('/', (req, res)=>{
  res.sendFile(__dirname + "/index.html");
})

app.post('/' ,(req, res)=> {
  //get body form fields
  let firstname = req.body.firstname;
  let lastname = req.body.lastname;
  let email = req.body.email;
  let country = req.body.country;
  let password = req.body.password;
  let address = req.body.address;
  let address2 = req.body.address2;
  let city = req.body.city;
  let state = req.body.state;
  let phoneNumber = req.body.phone_number;
  let zip = req.body.zip;
  
  // TASK*** Check format of form field values here on server side

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

  //request -- 3 params --> url, options, callback
  const request = https.request(url, options, (res)=>{
    //send data to mailchimp API server
    res.on('data', (data)=>{
      console.log(JSON.parse(data))
    })
  })
  //execute and end
  request.write(jsonData)
  request.end()

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
