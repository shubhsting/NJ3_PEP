const bcrypt = require("bcrypt");
const userModel = require("../Model/userModel");
const jwt = require("jsonwebtoken");
const { handleException } = require("../util/exceptionHandler");
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
      password: hashedPassword
    };
    await userModel.create(userInfo);
    return res.status(200).send({
      message: "Sign up successful! Kindly log in!",
    });
  } catch (e) {
    return handleException(e, "SIGNUP_CONTROLLER", res);
  }
}

module.exports = {
    login, signup
}
