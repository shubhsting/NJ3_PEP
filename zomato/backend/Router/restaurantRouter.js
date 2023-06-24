const express = require("express");
const { registerRestaurant } = require("../Controller/restaurantController");
const userAuth = require("../Middleware/userAuth");

const restaurantRouter = express.Router();

restaurantRouter.post("/register", userAuth, registerRestaurant);
module.exports = restaurantRouter;
