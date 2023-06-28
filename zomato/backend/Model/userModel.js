const mongoose = require("mongoose");
require("dotenv").config();
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
    type: String,
  },
  currentAddress: {
    type: String,
    required: true,
  },
  profile_image: {
    type: String,
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

// mongoose.connect(process.env.CONNECTION_URL).then(() => {
//   console.log("connected to user model");
//   userModel.collection
//     .createIndex({ geoCurrentAddress: "2dsphere" })
//     .then(() => {
//       console.log("user index created successfully");
//     })
//     .catch((e) => {
//       console.log("error occurred while creating index!!");
//     });
// });

connectToDatabase();

async function connectToDatabase() {
  try {
    const databaseConnect = await mongoose.connect(process.env.CONNECTION_URL);
    console.log("user database connected!!!")
  } catch (e) {
    console.log("exception occurred while connecting to user database");
  }

  try {
    const indexcreate = await userModel.collection.createIndex({
      geoCurrentAddress: "2dsphere",
    });
    console.log("index created!!!", indexcreate)
  } catch (e) {
    console.log("exception occurred while creating index in user model");
  }
}

module.exports = userModel;
