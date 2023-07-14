const mongoose = require("mongoose");
require("dotenv").config();

async function connectDB() {
  await mongoose.connect(process.env.CONNECTION_URL);
  let connectionValue = mongoose.connection.readyState;
  while (connectionValue != 1) {
    connectionValue = mongoose.connection.readyState;
    wait(2000);
  }
}

async function wait(ms) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, ms);
  });
}


module.exports = connectDB;