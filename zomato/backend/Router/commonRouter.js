const express = require("express");
const { getCoordinates } = require("../Controller/commonController");


const commonRouter = express.Router()



commonRouter.get("/location", getCoordinates);
module.exports = commonRouter;