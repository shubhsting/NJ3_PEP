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
      more_info,
      slug,
      photos: [],
      created_by: req.user._id,
    };
    const restaurant = await restaurantModel.findOne({ name, completeAddress });

    if (restaurant) {
      return res.status(500).send({
        message: "This restaurant already exists!!",
      });
    }
    const createdRestaurant = await restaurantModel.create(restaurantInfo);
    return res.status(200).send({
      message: "restaurant registered successfully",
      data: createdRestaurant,
    });
  } catch (e) {
    return handleException(e, "REGISTER_RESTAURANT_CONTROLLER", res);
  }
}

async function uploadRestaurantPhotos(req, res) {
  try {
    const fileDetails = req.files;
    if (!fileDetails) {
      return res.status(400).send({
        message: "invalid image!!",
      });
    }
    const restaurant = await restaurantModel.findById(req.restaurant._id);
    const filePaths = restaurant.photos;
    for (const image of fileDetails) {
      filePaths.push(image.path);
    }
    restaurant.photos = filePaths;
    await restaurant.save();
    return res.status(200).send({
      message: "images uploaded successfully!!",
    });
  } catch (e) {
    return handleException(e, "UPLOAD_RESTAURANT_PHOTOS_CONTROLLER", res);
  }
}

async function getRestaurant(req, res) {
  return res.status(200).send({
    data: req.restaurant,
    "message": "restaurant fetched succcesfully"
  })
}
module.exports = { registerRestaurant, uploadRestaurantPhotos, getRestaurant };
