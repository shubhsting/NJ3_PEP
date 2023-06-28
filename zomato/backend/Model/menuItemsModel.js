const mongoose = require("mongoose");
const connectToDB = require("./config");
require("dotenv").config();

connectToDB();

const menuItemsSchema = new mongoose.Schema({
  restaurant_id: {
    type: String,
  },
  name: {
    type: String,
  },
  image: {
    type: String,
  },
  category: {
    type: String,
  },
  tags: {
    type: [String],
  },
  description: {
    type: String,
  },
  price: {
    type: Number,
  },
});

const menuItemsModel = mongoose.model(
  "menuItemsCollection_Zomato",
  menuItemsSchema
);

module.exports = menuItemsModel;
