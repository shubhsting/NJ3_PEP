const mongoose = require('mongoose');
require('dotenv').config()

mongoose.connect(process.env.CONNECTION_URL)
  .then(() => console.log('Connected!'));

const menuItemsSchema = new mongoose.Schema({

})

const menuItemsModel = mongoose.model("menuItemsCollection_Zomato", menuItemsSchema);

module.exports = menuItemsModel