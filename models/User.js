const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');

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
  email: {
    type: String,
    validate(value){ //to validate value aswell as type above
      if(!validator.isEmail(value)){
        throw new Error("Email is not valid");
      }
    }
  },
  country: {
    type: String,
    required: [true, 'Country required']
  },
  password: { 
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

const saltRounds = 10;

userSchema.pre('save', async (next)=>{
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
})

module.exports = mongoose.model('User', userSchema);


// export default userSchema; //???