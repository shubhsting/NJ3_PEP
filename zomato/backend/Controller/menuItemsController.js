const menuItemsModel = require("../Model/menuItemsModel");
const { handleException } = require("../util/exceptionHandler");

async function createMenuItem(req, res) {
  try {
    const { name, image, category, tags, description, price } = req.body;
    const menuItem = await menuItemsModel.findOne({ name, category, price, restaurant_id: req.restaurant._id });

    if (menuItem) {
      return res.status(400).send({
        message: "This menuitem already exists!!",
      });
    }

    const menuItemInfo = {
      name,
      image,
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


module.exports = { createMenuItem };
