const express = require("express");
const { createRide, changeStatus, addRatingToRide } = require("../Controller/rideController");
const userAuth = require("../Middleware/userAuth");


const rideRouter = express.Router();


rideRouter.post("/create", userAuth, createRide)

rideRouter.post("/change-status", userAuth, changeStatus)

rideRouter.post("/rate", userAuth, addRatingToRide)

module.exports = rideRouter;