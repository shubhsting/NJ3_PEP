const mongoose = require('mongoose');
require('dotenv').config()

mongoose.connect(process.env.CONNECTION_URL)
  .then(() => console.log('Connected!'));

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
  location: {
    type: String
  },
  userId: {
    type: Number,
    required: true
  }
})

const eventModel = mongoose.model("eventCollection", eventSchema);

module.exports = eventModel