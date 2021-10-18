const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema(
  {
      name: {
          type: String,
          required:'Please enter your name'
      },
      address: {
        type: String
        // required: true
      },
      mobile: {
        type: String
        // required: true
      },
      password: {
        type: String
      },
      image: Image,
      text: String,
  }
)

module.exports = mongoose.model("Experts", taskSchema);
