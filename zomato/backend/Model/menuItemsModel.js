const mongoose = require("mongoose");
require("dotenv").config();

mongoose
  .connect(process.env.CONNECTION_URL)
  .then(() => console.log("Connected!"));

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
