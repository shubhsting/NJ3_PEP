const express = require("express");
const userAuth = require("../Middleware/userAuth");
const { restaurantValidator } = require("../Middleware/restaurantValidator");
const { createReview } = require("../Controller/reviewsController");
const reviewsRouter = express.Router();

reviewsRouter.post("/:restaurantSlug/create", userAuth, restaurantValidator, createReview)


module.exports = reviewsRouter;