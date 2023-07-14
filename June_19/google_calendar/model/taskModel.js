const mongoose = require('mongoose');
const connectDB = require('./config');
require('dotenv').config()

connectDB().then(() => console.log('Connected!'));

const taskSchema = new mongoose.Schema({
  startTime: {
    type: Number,
    required: true
  },
  description: {
    type: String
  },
  title: {
    type: String
  },
  userId: {
    type: String,
    required: true
  }
})

const taskModel = mongoose.model("taskCollection", taskSchema);

module.exports = taskModel