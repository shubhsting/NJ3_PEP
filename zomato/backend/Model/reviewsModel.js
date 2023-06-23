const mongoose = require('mongoose');
require('dotenv').config()

mongoose.connect(process.env.CONNECTION_URL)
  .then(() => console.log('Connected!'));

const reviewsSchema = new mongoose.Schema({

})

const reviewsModel = mongoose.model("reviewsCollection_Zomato", reviewsSchema);

module.exports = reviewsModel