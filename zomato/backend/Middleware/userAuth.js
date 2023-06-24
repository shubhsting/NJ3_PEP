const userModel = require("../Model/userModel");
const { handleException } = require("../util/exceptionHandler");
const jwt = require("jsonwebtoken");
require("dotenv").config();
async function userAuth(req, res, next) {
  try {
    const { auth_token } = req.headers;
    if (!auth_token) {
      return res.status(401).send({
        message: "user is not authorised",
      });
    }
    const decoded = jwt.verify(auth_token, process.env.JWT_SECRET);

    const user = await userModel.findOne({ email: decoded.data.email });

    if (!user) {
      return res.status(401).send({
        message: "user is not authorised",
      });
    }

    req.user = user;
    next();
  } catch (e) {
    return handleException(e, "USER_AUTH_MIDDLEWARE", res);
  }
}
module.exports = userAuth;
