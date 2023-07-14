const mongoose = require('mongoose');
const connectDB = require('./config');
require('dotenv').config()

connectDB().then(() => console.log('Connected!'));

const eventSchema = new mongoose.Schema({
  startTime: {
    type: Number,
    required: true
  },
  endTime: {
    type: Number,
    required: true
  },
  description: {
    type: String
  },
  guests: {
    type: [String]
  },
  link: {
    type: String
  },
  title: {
    type: String
  },
  location: {
    type: String
  },
  userId: {
    type: String,
    required: true
  }
})

const eventModel = mongoose.model("eventCollection", eventSchema);

module.exports = eventModel