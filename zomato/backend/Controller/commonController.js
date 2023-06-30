const { handleException } = require("../util/exceptionHandler");
const axios = require("axios");

async function getCoordinates(req, res) {
    try{
        const {location} = req.query;
        const url = `https://geocode.maps.co/search?q=${location}`;
        const response = await axios.get(url)
        
        const displayNameList = [];
        const finalLocationList = []

        for(const location of response.data) {
            if(displayNameList.indexOf(location.display_name) == -1) {
                finalLocationList.push(location);
                displayNameList.push(location.display_name)
            }
        }

        return res.status(200).send({
            message: "location fetched successfully",
            data: finalLocationList
        })
    } catch(e) {
        console.log(e)
        return handleException(e, "ADD_MENU_ITEM_IMAGE_CONTROLLER", res);
    }    
}

module.exports = {getCoordinates};

