const userModel = require("../Model/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const rideModel = require("../Model/rideModel");
require("dotenv").config();

async function login(req, res) {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(400).send({
        message: "user doesn't exist!",
      });
    }
    const doesPasswordsMatch = await bcrypt.compare(password, user.password);
    if (!doesPasswordsMatch) {
      return res.status(400).send({
        message: "invalid password!!",
      });
    }
    const token = jwt.sign(
      {
        email: user.email,
        time: new Date(),
      },
      process.env.JWT_SECRET_KEY
    );
    return res.status(200).send({
      message: "login successful",
      data: token,
    });
  } catch (e) {
    return res.status(500).send({
      message: "Exception occured while logging in!",
    });
  }
}

async function signup(req, res) {
  try {
    const { email, password, firstName, lastName, currentLocation } = req.body;
    const user = await userModel.findOne({ email });
    if (user) {
      return res.status(400).send({
        message: "user already exists! Kindly log in!",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await userModel.create({
      email,
      password: hashedPassword,
      firstName,
      lastName,
      currentLocation,
    });

    return res.status(200).send({
      message: "user created successfully",
    });
  } catch (e) {
    console.log(e);
    return res.status(500).send({
      message: "Exception occured while signing up!",
    });
  }
}
async function getUserDetails(req, res) {
  try {
    const user = req.user;
    const ridesRequested = await rideModel.find({ createdBy: user._id });
    let userRatingSum = 0;
    for (const ride of ridesRequested) {
      userRatingSum += ride.customerRating;
    }

    const ridesTaken = await rideModel.find({ driverId: user._id });
    let driverRatingSum = 0;

    for (const ride of ridesTaken) {
      driverRatingSum += ride.driverRating;
    }

    return res.status(200).send({
      user: user,
      ridesTaken,
      ridesRequested,
      userRating: userRatingSum / ridesRequested.length,
      driverRating: driverRatingSum / ridesTaken.length,
    });
  } catch (e) {
    return res.status(500).send({
      message: "Exception occured while getting user details!",
    });
  }
}

// create ride user
// get rides near me as driver
// accept ride driver

// mongo geospatial queries

// ride table -> start location
// user table -> current location

// i want to fetch all rides whose starting location is in 5 km range from driver
async function getAllNearestRides(req, res) {
  try {
    const { latitude, longitude } = req.body;
    let currentLocation = {};
    if (latitude && longitude) {
      currentLocation = {
        type: "Point",
        coordinates: [latitude, longitude],
      };
    } else {
      currentLocation = req.user.currentLocation;
    }

    const rides = await rideModel.find({
      startLocation: {
        $near: {
          $geometry: currentLocation,
          $maxDistance: 5000,
        },
      },
      status: "CREATED",
      createdBy: { $ne: req.user._id },
    });

    return res.status(200).send({
      message: "rides fetched successfully!!!",
      data: rides,
    });
  } catch (e) {
    return res.status(500).send({
      message: "Exception occured while getting nearest rides!",
    });
  }
}

module.exports = { login, signup, getUserDetails, getAllNearestRides };
