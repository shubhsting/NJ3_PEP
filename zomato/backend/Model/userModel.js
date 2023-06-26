const mongoose = require("mongoose");
require("dotenv").config();

mongoose
  .connect(process.env.CONNECTION_URL)
  .then(() => console.log("Connected!"));

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
  },
  password: {
    type: String
  },
  currentAddress: {
    type: String,
    required: true,
  },
  profile_image: {
    type: String
  },
  geoCurrentAddress: {
    type: {
      type: String, // Don't do `{ location: { type: String } }`
      enum: ["Point"], // 'location.type' must be 'Point'
      required: true,
    },
    coordinates: {
      type: [Number],
      required: true,
    },
  },
});

const userModel = mongoose.model("userCollection_Zomato", userSchema);

module.exports = userModel;
