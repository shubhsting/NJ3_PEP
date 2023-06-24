const express = require("express");
const { createMenuItem } = require("../Controller/menuItemsController");
const { restaurantOwnerValidator } = require("../Middleware/restaurantOwnerValidator");
const userAuth = require("../Middleware/userAuth");

const menuItemRouter = express.Router();

menuItemRouter.post("/:restaurantSlug/create",userAuth, restaurantOwnerValidator, createMenuItem);
module.exports = menuItemRouter;
