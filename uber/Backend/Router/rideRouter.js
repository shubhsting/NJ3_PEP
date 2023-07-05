const express = require("express");
const { createRide, changeStatus, addRatingToRide, getStatus } = require("../Controller/rideController");
const userAuth = require("../Middleware/userAuth");


const rideRouter = express.Router();


rideRouter.post("/create", userAuth, createRide)

rideRouter.post("/change-status", userAuth, changeStatus)

rideRouter.post("/rate", userAuth, addRatingToRide)

rideRouter.post("/getById", userAuth, getStatus)

module.exports = rideRouter;