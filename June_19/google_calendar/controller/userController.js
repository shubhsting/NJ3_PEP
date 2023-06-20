const userModel = require("../model/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

async function signUp(req, res) {
  try {
    const { email, first_name, last_name, phone, password, profile_image } =
      req.body;

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await userModel.create({
      email,
      phone,
      first_name,
      last_name,
      profile_image,
      password: hashedPassword,
    });
    return res.status(200).send({
      message: "user created successfully!!",
      user,
    });
  } catch (e) {
    return res.status(500).send({
      message: "Exception occured while signing up!!",
      error: e,
    });
  }
}

async function login(req, res) {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(400).send({
        message: "user does not exist!!",
      });
    }

    const doesPasswordsMatch = await bcrypt.compare(password, user.password);
    if (!doesPasswordsMatch) {
      return res.status(401).send({
        message: "You are not authorised to access this accounta!!",
      });
    }
    const token = jwt.sign(
      {
        exp: Math.floor(Date.now() / 1000) + 3 * 60 * 60,
        data: user.email,
      },
      process.env.JWT_SECRET
    );

    return res.status(200).send({
      message: "login successful!!",
      authToken: token,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).send({
      message: "exception occurred while logging in!!",
      error: e,
    });
  }
}

async function getUser(req, res) {
  try {
    return res.status(200).send({
      user: req.user,
    });
  } catch (e) {
    return res.status(500).send({
      message: "exception occurred while fetching user!!",
      error: e,
    });
  }
}

async function updateUser(req, res) {
  try {
    const { first_name, last_name, phone, password } = req.body;

    let updateObj = {};

    if (first_name) {
      updateObj = {
        ...updateObj,
        first_name,
      };
    }

    if (last_name) {
      updateObj = {
        ...updateObj,
        last_name,
      };
    }
    if (phone) {
      updateObj = {
        ...updateObj,
        phone,
      };
    }
    if (password) {
      updateObj = {
        ...updateObj,
        password: bcrypt.hash(password, 10),
      };
    }
    await userModel.findOneAndUpdate({ email: req.user.email }, updateObj);
    return res.status(200).send({
      message: "updated the user details",
    });
  } catch (e) {
    return res.status(500).send({
      message: "exception occurred while updating user!!",
      error: e,
    });
  }
}

async function deleteUser(params) {
  try {
    await userModel.findByIdAndDelete(req.user.id)
    return res.status(200).send({
      message: "user have been deleted!!!"
    })
  } catch (e) {
    return res.status(500).send({
      message: "exception occurred while deleting user!!",
      error: e,
    });
  }
}

module.exports = {
  login,
  signUp,
  getUser,
  updateUser,
  deleteUser
};
