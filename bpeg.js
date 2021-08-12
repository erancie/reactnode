//API test for browser

const express = require('express');
const bodyParser = require('body-parser');

////////////////////////////////////////////
app.post('/', (req, res)=>{
  const num1 = req.body.num1; //body strings
  const num2 = req.body.num2;
  let sum = Number(num1) + Number(num2);
  if (sum >= 100) {
    res.send(`The sum ${sum} is 100 or over`)
    
  }else {
    res.send(`The sum ${sum} is less than 100`)
  }
  // res.redirect("/");
})
//////////////////////////////////////////

// HTML
// <!-- <h1>Add A New Item:</h1> -->

// <!-- <form action="/" method="POST">
//   <input name='num1' type="text" placeholder="first number">
//   <input name='num2' type="text" placeholder="second number">
//   <button name='submit' type="submit">POST!</button>
// </form> -->


//NOTES -- FORM FIELDS

//body-parser req access
//urlencoded - req.body ??
//json - req.params ??



  ///////////////////////////////////////////
  
  // registrations = [];

    // //get body form field values
    // let zip = req.body.zip;
    // let address = req.body.address;
    // //user schema
    // user = {address: address, zip: zip};
    // console.log(user);
    // //push to data structure
    // registrations.push(user);

    // console.log(registrations);
    // // res.send(registrations);

    // // res.redirect('/welcome.html');
