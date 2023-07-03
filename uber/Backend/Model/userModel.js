const createConnection = require("./config");

const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  email: {
    type: String,
  },
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  currentLocation: {
    type: {
      type: String,
      enum: ["Point"],
      required: true,
    },
    coordinates: {
      type: [Number],
      required: true,
    },
  },
  password: {
    type: String,
  },
});
const userModel = mongoose.model("userCollection_Uber", userSchema);

async function createIndex() {
  await createConnection();
  try {
    const indexcreate = await userModel.collection.createIndex({
        currentLocation: "2dsphere",
    });
    console.log("index created!!!", indexcreate);
  } catch (e) {
    console.log("exception occurred while creating index in user model");
  }
}

createIndex();

module.exports = userModel;
