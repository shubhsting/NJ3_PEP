const mongoose = require("mongoose");
require("dotenv").config();

async function createConnection() {
  await mongoose.connect(process.env.CONNECTION_URL);
  let connectionValue = mongoose.connection.readyState;

  while (connectionValue != 1) {
    connectionValue = mongoose.connection.readyState;
    await wait(2000);
  }

  console.log(`connection ready with state ${connectionValue}`)
}

async function wait(ms) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, ms);
  });
}
module.exports = createConnection