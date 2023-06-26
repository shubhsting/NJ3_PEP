const menuItemsModel = require("../Model/menuItemsModel");
const { handleException } = require("../util/exceptionHandler");
const mongoose = require("mongoose");

async function createMenuItem(req, res) {
  try {
    const { name, category, tags, description, price } = req.body;
    const menuItem = await menuItemsModel.findOne({
      name,
      category,
      price,
      restaurant_id: req.restaurant._id,
    });

    if (menuItem) {
      return res.status(400).send({
        message: "This menuitem already exists!!",
      });
    }

    const menuItemInfo = {
      name,
      category,
      tags,
      description,
      price,
      restaurant_id: req.restaurant._id,
    };

    const item = await menuItemsModel.create(menuItemInfo);
    return res.status(200).send({
      message: "item created successfully!!!",
      data: item,
    });
  } catch (e) {
    return handleException(e, "CREATE_MENU_ITEM_CONTROLLER", res);
  }
}

async function addMenuItemImage(req, res) {
  try {
    const imageDetails = req.file;

    if (!imageDetails) {
      return res.status(400).send({
        message: "invalid image!!",
      });
    }
    const { itemId } = req.params;
    const objectID = new mongoose.Types.ObjectId(itemId);

    const menuItem = await menuItemsModel.findById(objectID);
    menuItem.image = imageDetails.path;
    await menuItem.save();
    return res.status(200).send({
      message: "image uploaded successfully!!!",
    });
  } catch (e) {
    console.log(e);
    return handleException(e, "ADD_MENU_ITEM_IMAGE_CONTROLLER", res);
  }
}

module.exports = { createMenuItem, addMenuItemImage };
