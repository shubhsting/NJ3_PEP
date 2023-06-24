const restaurantModel = require("../Model/restaurantModel");
const { handleException } = require("../util/exceptionHandler");
const slugify = require("../util/slugHandlers");

async function registerRestaurant(req, res) {
  try {
    const {
      name,
      completeAddress,
      geoCompleteAddress,
      contact_no,
      landline,
      owner_name,
      owner_phone,
      owner_email,
      popularDishes,
      openingHours,
      photos,
      more_info,
    } = req.body;

    const slug = slugify(name + "-" + completeAddress);
    const restaurantInfo = {
      name,
      completeAddress,
      geoCompleteAddress,
      contact_no,
      landline,
      owner_name,
      owner_phone,
      owner_email,
      popularDishes,
      openingHours,
      photos,
      more_info,
      slug,
      created_by: req.user._id,
    };
    const restaurant = await restaurantModel.findOne({ name, completeAddress });

    if (restaurant) {
      return res.status(500).send({
        message: "This restaurant already exists!!",
      });
    }
    await restaurantModel.create(restaurantInfo);
    return res.status(200).send({
      message: "restaurant registered successfully",
    });
  } catch (e) {
    console.log(e);
    return handleException(e, "REGISTER_RESTAURANT_CONTROLLER", res);
  }
}

module.exports = { registerRestaurant };
