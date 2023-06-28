const mongoose = require("mongoose");
require("dotenv").config();

async function connectToDB() {
  await mongoose.connect(process.env.CONNECTION_URL);

  let connectionValue = mongoose.connection.readyState;

  while (connectionValue != 1) {
    connectionValue = mongoose.connection.readyState;
    console.log("connection value was found to be", connectionValue);
    await wait(2000);
  }
}

const wait = (ms) => {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, ms);
  });
};
module.exports = connectToDB;
