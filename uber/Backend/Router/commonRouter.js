const express =  require("express");
const userAuth = require("../Middleware/userAuth");
const { getCoordinates, getAdress } = require("../Controller/commonController");

const commonRouter =  express.Router()



commonRouter.get("/get-coordinates", getCoordinates);
commonRouter.post("/get-address",  getAdress);


module.exports = commonRouter;