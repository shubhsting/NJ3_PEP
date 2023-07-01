const express = require("express");
const multer = require("multer");
const { restaurantOwnerValidator } = require("../Middleware/restaurantOwnerValidator");
const {
  registerRestaurant,
  uploadRestaurantPhotos,
  getRestaurant,
} = require("../Controller/restaurantController");
const userAuth = require("../Middleware/userAuth");
const { fetchRestaurantReviews } = require("../Controller/reviewsController");
const { restaurantValidator } = require("../Middleware/restaurantValidator");

const storageConfiguration = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/images/restaurants");
  },
  filename: function (req, file, cb) {
    cb(null, `restaurant-${Date.now()}.jpg`);
  },
});

function multerFileFilter(req, file, cb) {
  if (file.mimetype.includes("image")) {
    cb(null, true);
  } else {
    cb(null, false);
  }
}

const restaurantRouter = express.Router();

const upload = multer({
  storage: storageConfiguration,
  fileFilter: multerFileFilter,
});

restaurantRouter.post("/register", userAuth, registerRestaurant);
restaurantRouter.post(
  "/:restaurantSlug/upload-images",
  userAuth,
  restaurantOwnerValidator, 
  upload.array("photos", 10),
  uploadRestaurantPhotos
);
restaurantRouter.get("/:restaurantSlug/fetch", restaurantValidator, getRestaurant);

restaurantRouter.get("/:restaurantSlug/reviews", restaurantValidator, fetchRestaurantReviews);
module.exports = restaurantRouter;
