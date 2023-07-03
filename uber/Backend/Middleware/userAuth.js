
const jwt = require("jsonwebtoken");
const userModel = require("../Model/userModel");
require("dotenv").config();
async function userAuth(req, res, next) {
    try{
        const {auth_token} = req.headers;
        const decoded = jwt.verify(auth_token, process.env.JWT_SECRET_KEY);
        console.log(decoded)
        const user = await userModel.findOne({ email: decoded.email });

        if (!user) {
          return res.status(401).send({
            message: "user is not authorised",
          });
        }
    
        req.user = user;
        next();

    } catch(e) {
        console.log(e)
        return res.status(500).send({
            message: "Exception occured in user middleware",
          });
    }
}

module.exports = userAuth;