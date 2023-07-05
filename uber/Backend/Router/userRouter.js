const express =  require("express");
const { login, signup, getUserDetails, getAllNearestRides } = require("../Controller/userController");
const userAuth = require("../Middleware/userAuth");

const userRouter =  express.Router()



userRouter.post("/login", login);
userRouter.post("/signup", signup);
userRouter.get("/details", userAuth, getUserDetails);
userRouter.post("/fetch-rides", userAuth, getAllNearestRides)

module.exports = userRouter;