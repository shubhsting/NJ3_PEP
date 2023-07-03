const axios = require("axios");

async function getCoordinates(req, res) {
  try {
    const { location } = req.query;
    const url = `https://geocode.maps.co/search?q=${location}`;
    const response = await axios.get(url);

    const displayNameList = [];
    const finalLocationList = [];

    for (const location of response.data) {
      if (displayNameList.indexOf(location.display_name) == -1) {
        finalLocationList.push(location);
        displayNameList.push(location.display_name);
      }
    }

    return res.status(200).send({
      message: "location fetched successfully",
      data: finalLocationList,
    });
  } catch (e) {
    return res.status(500).send({
      message: "exception occured while getting coordinates!!!",
    });
  }
}

async function getAdress(req, res) {
    try {
        const { latitude, longitude } = req.body;
        const url = `https://geocode.maps.co/reverse?lat=${latitude}&lon=${longitude}`;
        const response = await axios.get(url);
    
        return res.status(200).send({
          message: "location fetched successfully",
          data: response.data,
        });
      } catch (e) {
        console.log(e)
        return res.status(500).send({
          message: "exception occured while getting coordinates!!!",
        });
      }

}

module.exports = {getAdress, getCoordinates}

// geocoding adress-> coordinates
// reverse geocoding -> coordinates -> address
