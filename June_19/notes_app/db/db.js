const mongoose = require('mongoose');
require('dotenv').config()

mongoose.connect(process.env.CONNECTION_URL)
  .then(() => console.log('Connected!'));

const notesSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  }
})

const notesModel = mongoose.model("notesCollection", notesSchema);

module.exports = notesModel