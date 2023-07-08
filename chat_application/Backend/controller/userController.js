const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userModel = require("../model/userModel");

require("dotenv").config();

async function loginUser(req, res) {
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
        firstName: user.firstName,
        lastName: user.lastName,
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

async function signupUser(req, res) {
  try {
    const { email, password, firstName, lastName } = req.body;
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

module.exports = {loginUser, signupUser}