const express = require("express");
const { signup, login } = require("../controller/userController");
const validateInput = require("../middleware/inputValidation");
const { loginSchema, signUpSchema } = require("../validations/schema");

const userRouter = express.Router();

userRouter.post("/signup", validateInput(signUpSchema), signup);

userRouter.post("/login", validateInput(loginSchema), login);

module.exports = userRouter;
