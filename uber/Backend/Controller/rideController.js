const rideModel = require("../Model/rideModel");
const { distance } = require("../util/rideUtil");

async function createRide(req, res) {
  try {
    const { startLocation, endLocation } = req.body;

    const user = req.user;
    const totalDistane = distance(
      startLocation.coordinates[0],
      endLocation.coordinates[0],
      startLocation.coordinates[1],
      endLocation.coordinates[1]
    );
    const rideObj = {
      startLocation,
      endLocation,
      createdBy: user._id,
      status: "CREATED",
      distanceInKm: totalDistane,
      startTime: Date.now(),
      estimatedTravelTime: totalDistane * 5,
      estimatedFare: totalDistane * 12,
    };
    const ride = await rideModel.create(rideObj);

    return res.status(200).send({
      message: "ride created successfully!!",
      data: ride,
    });
  } catch (e) {
    return res.status(500).send({
      message: "exception occurred while creating ride",
    });
  }
}

async function changeStatus(req, res) {
  try {
  } catch (e) {
    return res.status(500).send({
      message: "exception occurred while changing status of ride",
    });
  }
}
