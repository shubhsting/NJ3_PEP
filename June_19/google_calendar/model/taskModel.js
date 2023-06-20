const mongoose = require('mongoose');
require('dotenv').config()

mongoose.connect(process.env.CONNECTION_URL)
  .then(() => console.log('Connected!'));

const taskSchema = new mongoose.Schema({
  startTime: {
    type: Number,
    required: true
  },
  description: {
    type: String
  },
  userId: {
    type: String,
    required: true
  }
})

const taskModel = mongoose.model("taskCollection", taskSchema);

module.exports = taskModel