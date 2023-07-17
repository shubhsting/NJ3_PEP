const jwt = require("jsonwebtoken");
const db = require("../models");
async function userAuth(req, res, next) {
  try {
    const { auth_token } = req.headers;

    if (!auth_token) {
      return res.status(401).send({
        message: "user not authorised to access!!",
      });
    }
    const decoded = jwt.verify(auth_token, process.env.JWT_KEY);
    const user = await db.User.findOne({
      where: { email: decoded.email, userName: decoded.userName },
    });

    if (!user) {
      return res.status(401).send({
        message: "user not authorised to access!! invalid token",
      });
    }

    req.user = user;
    next();
  } catch (e) {
    console.log(e)
    return res.status(500).send({
      message: "exception occured in user auth middleware",
    });
  }
}
module.exports = userAuth;