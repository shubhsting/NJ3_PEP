const express = require("express");
const { createMenuItem } = require("../Controller/menuItemsController");
const { restaurantValidator } = require("../Middleware/restaurantValidator");
const userAuth = require("../Middleware/userAuth");

const menuItemRouter = express.Router();

menuItemRouter.post("/:restaurantSlug/create",userAuth, restaurantValidator, createMenuItem);
module.exports = menuItemRouter;
