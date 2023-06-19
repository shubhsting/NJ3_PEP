const mongoose = require('mongoose');
require('dotenv').config()

mongoose.connect(process.env.CONNECTION_URL)
  .then(() => console.log('Connected!'));

const userSchema = new mongoose.Schema({
  phone: {
    type: Number,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  first_name: {
    type: String,
    required: true
  },
  last_name: {
    type: [String]
  },
  password: {
    type: String
  },
  profile_image: {
    type: String
  }
})

const userModel = mongoose.model("userCollection", userSchema);

module.exports = userModel