const express = require("express");
const {
  createMenuItem,
  addMenuItemImage,
} = require("../Controller/menuItemsController");
const multer = require("multer");
const {
  restaurantOwnerValidator,
} = require("../Middleware/restaurantOwnerValidator");
const userAuth = require("../Middleware/userAuth");

const storageConfiguration = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/images/menuItems");
  },
  filename: function (req, file, cb) {
    cb(null, `menu-item-${Date.now()}.jpg`);
  },
});

function multerFileFilter(req, file, cb) {
  if (file.mimetype.includes("image")) {
    cb(null, true);
  } else {
    cb(null, false);
  }
}

const upload = multer({
  storage: storageConfiguration,
  fileFilter: multerFileFilter,
});
const menuItemRouter = express.Router();

menuItemRouter.post(
  "/:restaurantSlug/create",
  userAuth,
  restaurantOwnerValidator,
  createMenuItem
);

menuItemRouter.post(
  "/:restaurantSlug/upload-image/:itemId",
  userAuth,
  restaurantOwnerValidator,
  upload.single("image"),
  addMenuItemImage
);
module.exports = menuItemRouter;
