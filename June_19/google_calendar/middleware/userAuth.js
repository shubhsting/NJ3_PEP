const jwt = require("jsonwebtoken");
const userModel = require("../model/userModel");
require('dotenv').config()

async function userAuth(req, res, next) {
    try{
        const {auth_token} = req.headers;

        if(!auth_token) {
            return res.status(401).send({
                message: "You are not authorised!!"
            })
        }
        const decoded = jwt.verify(auth_token, process.env.JWT_SECRET);

        const user = await userModel.findOne({email: decoded.data});
        if(!user) {
            return res.status(401).send({
                message: "You are not authorised to access this accounta!!"
            })
        }
        req.user = user;
        next();
    } catch(e) {
        return res.status(500).send({
            message: "exception occurred while fetching user in middleware!",
            error:e
        })
    }
}

module.exports = userAuth;