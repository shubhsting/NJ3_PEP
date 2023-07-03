
const jwt = require("jsonwebtoken");
const userModel = require("../Model/userModel");
require("dotenv").config();
async function userAuth(req, res, next) {
    try{
        const {auth_token} = req.headers;
        const decoded = jwt.verify(auth_token, process.env.JWT_SECRET_KEY);

        const user = await userModel.findOne({ email: decoded.data.email });

        if (!user) {
          return res.status(401).send({
            message: "user is not authorised",
          });
        }
    
        req.user = user;
        next();

    } catch(e) {
        return res.status(500).send({
            message: "Exception occured in user middleware",
          });
    }
}

module.exports = userAuth;