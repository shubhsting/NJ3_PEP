const express = require("express");
const { signup, login, getPosts, getUserProfile } = require("../controller/userController");
const validateInput = require("../middleware/inputValidation");
const { loginSchema, signUpSchema } = require("../validations/schema");
const { createfollowRequest, deleteFollowRequest, updateFollowRequest } = require("../controller/followRequestsController");
const userAuth = require("../middleware/userAuth");

const userRouter = express.Router();

userRouter.post("/signup", validateInput(signUpSchema), signup);

userRouter.post("/login", validateInput(loginSchema), login);


userRouter.put("/:userId/follow", createfollowRequest);
userRouter.post("/:userId/follow-request-update", updateFollowRequest);
userRouter.put("/:userId/unfolow", deleteFollowRequest)
userRouter.get("/posts", userAuth, getPosts)
userRouter.get("/profile", userAuth, getUserProfile)
module.exports = userRouter;
