const db = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

async function login(req, res) {
  try {
    const { email, password, userName } = req.body;
    let user;
    if (email) {
      user = await db.User.findOne({ where: { email } });
    } else {
      user = await db.User.findOne({ where: { userName } });
    }

    if (!user) {
      return res.status(400).send({
        message: "user not found!!kindly sign up!!",
      });
    }

    const doesPasswordMatch = await bcrypt.compare(password, user.password);
    if (!doesPasswordMatch) {
      return res.status(400).send({
        message: "passwords do not match!!",
      });
    }
    const token = jwt.sign(
      {
        email: user.email,
        userName: user.userName,
        date: new Date(),
      },
      process.env.JWT_KEY
    );

    return res.status(200).send({
      message: "login successfull",
      token: token,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).send({
      message: "exception occurred while logging in",
    });
  }
}

async function signup(req, res) {
  try {
    const { email, firstName, lastName, phone, userName, password } = req.body;
    const emailUser = await db.User.findOne({ where: { email } });

    if (emailUser) {
      return res.status(400).send({
        message: "user with same email already exists!!",
      });
    }

    const usernameUser = await db.User.findOne({ where: { userName } });
    if (usernameUser) {
      return res.status(400).send({
        message: "user with same user name already exists!!",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await db.User.create({
      email,
      firstName,
      lastName,
      phone,
      userName,
      password: hashedPassword,
    });
    return res.status(200).send({
      message: "user signup successful",
      user,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).send({
      message: "exception occurred while signing up",
    });
  }
}

async function getPosts(req, res) {
  try {
    const posts = await db.Post.findAll({
      attributes: ["postContent", "imageURL"],
      include: [
        {
          model: db.PostLike,
          attributes: ['userId'],
          required: true,
          include: [{
            model: db.User,
            attributes: ["firstName", "lastName"],
            required: true
          }]
        },
        {
          model: db.PostComment,
          attributes: ["content"],
          required: true,
          include: [{
            model: db.User,
            attributes: ["firstName", "lastName"],
            required: true
          }]
        },
        {
          model: db.User,
          attributes: ["firstName", "lastName"],
          required: true
        }
      ],
    });
    return res.status(200).send({
      message: "posts fetched successfully",
      posts,
    });
  } catch (e) {
    console.log(e)
    return res.status(500).send({
      message: "exception occurred while getting posts",
    });
  }
}
module.exports = { login, signup, getPosts };
