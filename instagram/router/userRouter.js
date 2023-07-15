const express = require("express");
const { signup, login } = require("../controller/userController");
const validateInput = require("../middleware/inputValidation");
const { loginSchema, signUpSchema } = require("../validations/schema");
const { createfollowRequest, deleteFollowRequest, updateFollowRequest } = require("../controller/followRequestsController");

const userRouter = express.Router();

userRouter.post("/signup", validateInput(signUpSchema), signup);

userRouter.post("/login", validateInput(loginSchema), login);


userRouter.put("/:userId/follow", createfollowRequest);
userRouter.post("/:userId/follow-request-update", updateFollowRequest);
userRouter.put("/:userId/unfolow", deleteFollowRequest)

module.exports = userRouter;
