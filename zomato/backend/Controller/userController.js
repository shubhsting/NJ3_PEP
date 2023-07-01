const bcrypt = require("bcrypt");
const userModel = require("../Model/userModel");
const jwt = require("jsonwebtoken");
const { handleException } = require("../util/exceptionHandler");
const restaurantModel = require("../Model/restaurantModel");
require("dotenv").config();

async function login(req, res) {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(404).send({
        message: "The user email is not registered! Kindly sign up",
      });
    }

    const doesPasswordMatch = await bcrypt.compare(password, user.password);
    if (!doesPasswordMatch) {
      return res.status(401).send({
        message: "You are not authorised to access this accounts!!",
      });
    }
    const userInfo = {
      email: email,
      timestamp: new Date(),
    };
    const token = jwt.sign(
      {
        exp: Math.floor(Date.now() / 1000) + 3 * 60 * 60,
        data: userInfo,
      },
      process.env.JWT_SECRET
    );
    return res.status(200).send({
      message: "Login successful!!",
      token: token,
    });
  } catch (e) {
    return handleException(e, "LOGIN_CONTROLLER", res);
  }
}

async function signup(req, res) {
  try {
    const {
      email,
      phone,
      first_name,
      last_name,
      currentAddress,
      geoCurrentAddress,
      password,
    } = req.body;
    const user = await userModel.findOne({ email });
    if (user) {
      return res.status(400).send({
        message: "This user already exists! Kindly try logging in!",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const userInfo = {
      email,
      phone,
      first_name,
      last_name,
      currentAddress,
      geoCurrentAddress,
      password: hashedPassword,
    };

    //geocoding api fetch coordinates
    await userModel.create(userInfo);
    return res.status(200).send({
      message: "Sign up successful! Kindly log in!",
    });
  } catch (e) {
    return handleException(e, "SIGNUP_CONTROLLER", res);
  }
}

async function uploadProfilePicture(req, res) {
  try {
    const imageDetails = req.file;
    if (!imageDetails) {
      return res.status(400).send({
        message: "invalid image!!",
      });
    }
    const imagePath = imageDetails.path;
    const user = await userModel.findById(req.user._id);
    user.profile_image = imagePath;
    await user.save();

    return res
      .status(200)
      .send({ message: "user image uploaded successfully" });
  } catch (e) {
    return handleException(e, "UPLOAD_PP_CONTROLLER", res);
  }
}

async function getUserDetails(req, res) {
  try {
    return res.status(200).send({
      message: "user fetched successfully",
      user: req.user,
    });
  } catch (e) {
    console.log(e);
    return handleException(e, "GET_USER_DETAILS", res);
  }
}

// https://www.mongodb.com/docs/manual/geospatial-queries/
async function fetchRestaurantsNearUser(req, res) {
  try {
    // 5 KM RANGE fectch all restaurants
    // fetch all the resturants whose geocurrentAddress is in 5 km range of user address
    let geoLocation = {};
    const { latitude, longitude } = req.body;
    if (latitude && longitude) {
      geoLocation = {
        type: "Point",
        coordinates: [latitude, longitude],
      };
    } else {
      geoLocation = req.user.geoCurrentAddress;
    }

    const restaurants = await restaurantModel.find({
      geoCompleteAddress: {
        $near: {
          $geometry: geoLocation,
          $maxDistance: 5000,
        },
      },
    });
    return res.status(200).send({
      message: "restaurants fetched successfully!!!",
      restaurants: restaurants,
    });
  } catch (e) {
    return handleException(e, "FETCH_RESTAURANTS_NEAR_USER", res);
  }
}

module.exports = {
  login,
  signup,
  uploadProfilePicture,
  getUserDetails,
  fetchRestaurantsNearUser,
};
