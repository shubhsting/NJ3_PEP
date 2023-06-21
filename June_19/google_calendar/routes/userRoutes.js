const express = require("express");
const {
  signUp,
  login,
  getUser,
  updateUser,
  deleteUser,
} = require("../controller/userController");
const userAuth = require("../middleware/userAuth");

const userRoutes = express.Router();

userRoutes.post("/signup", signUp);
userRoutes.post("/login", login);
userRoutes.get("/profile", userAuth, getUser);
userRoutes.post("/profile/update", userAuth, updateUser);
userRoutes.delete("/profile", userAuth, deleteUser);

module.exports = userRoutes;
