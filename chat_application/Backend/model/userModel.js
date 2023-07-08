const createConnection = require("./config");

const mongoose = require("mongoose");

createConnection();
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
  password: {
    type: String,
  },
});
const userModel = mongoose.model("userCollection_ChatApp", userSchema);

module.exports = userModel;

