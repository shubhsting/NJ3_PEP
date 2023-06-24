const mongoose = require("mongoose");
require("dotenv").config();

mongoose
  .connect(process.env.CONNECTION_URL)
  .then(() => console.log("Connected!"));

const reviewsSchema = new mongoose.Schema({
  restaurant_id: {
    type: String,
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
  },
  description: {
    type: String,
  },
  user_id: {
    type: String,
  },
  menu_item_id: {
    type: String,
  },
  createdAt: {
    type: Date,
  },
  tags: {
    type: [String],
  },
});

const reviewsModel = mongoose.model("reviewsCollection_Zomato", reviewsSchema);

module.exports = reviewsModel;
