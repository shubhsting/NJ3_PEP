const express =  require("express");
const { login, signup, getUserDetails } = require("../Controller/userController");
const userAuth = require("../Middleware/userAuth");

const userRouter =  express.Router()



userRouter.post("/login", login);
userRouter.post("/signup", signup);
userRouter.get("/details", userAuth, getUserDetails);


module.exports = userRouter;