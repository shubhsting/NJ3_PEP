const Joi = require("joi");
const signUpSchema = Joi.object({
  email: Joi.string().email().required(),
  userName: Joi.string().min(6).max(10).required(),
  password: Joi.string().required(),
  firstName: Joi.string().required(),
  lastName: Joi.string(),
  phone: Joi.string()
});

const loginSchema = Joi.object({
  email: Joi.string().email(),
  userName: Joi.string().min(6).max(10),
  password: Joi.string().required(),
}).or("email", "userName");

module.exports = {loginSchema, signUpSchema}