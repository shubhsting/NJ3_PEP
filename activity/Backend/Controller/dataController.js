const axios = require("axios");
async function getEntries(req, res) {
  try {
    const response = await axios.get("https://api.publicapis.org/entries");
    return res.status(200).send({
      count: response.data.count,
      entries: response.data.entries,
    });
  } catch (e) {
    return res.status(500).send({
      message: "error occurred",
    });
  }
}

module.exports = getEntries;
