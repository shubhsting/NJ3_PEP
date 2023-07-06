const rideModel = require("../Model/rideModel");
const userModel = require("../Model/userModel");
const { distance } = require("../util/rideUtil");
const mongoose = require("mongoose");

async function createRide(req, res) {
  try {
    const { startLocation, endLocation, start, end } = req.body;

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
      start,
      end,
      createdBy: user._id,
      status: "CREATED",
      distanceInKm: totalDistane,
      creationTime: Date.now(),
      estimatedTravelTime: totalDistane * 5,
      estimatedFare: totalDistane * 12,
    };
    const ride = await rideModel.create(rideObj);

    return res.status(200).send({
      message: "ride created successfully!!",
      data: ride,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).send({
      message: "exception occurred while creating ride",
    });
  }
}
// "CREATED",
// "ACCEPTED_BY_DRIVER_ON_HIS_WAY",
// "REACHED_LOCATION",
// "STARTED",
// "ENDED",
async function changeStatus(req, res) {
  try {
    const { status, rideId, estimatedArrivalTime } = req.body;
    const user = req.user;

    const rideObjectId = new mongoose.Types.ObjectId(rideId);

    const ride = await rideModel.findById(rideObjectId);

    let updateObj = {};
    if (status == "ACCEPTED_BY_DRIVER_ON_HIS_WAY") {
      updateObj = {
        driverId: user._id,
        estimatedArrivalTime,
        status,
      };
    } else if (status == "REACHED_LOCATION") {
      updateObj = {
        status,
      };
    } else if (status == "STARTED") {
      updateObj = {
        startTime: Date.now(),
        status,
      };
    } else if (status == "ENDED") {
      updateObj = {
        endTime: Date.now(),
        totalFare: ride.estimatedFare,
        status,
      };
    }
    await rideModel.findByIdAndUpdate(rideObjectId, updateObj);
    return res.status(200).send({
      message: "ride updated successfully!!!",
    });
  } catch (e) {
    return res.status(500).send({
      message: "exception occurred while changing status of ride",
    });
  }
}

async function getStatus(req, res) {
  try {
    const { rideId } = req.body;
    const rideObjectId = new mongoose.Types.ObjectId(rideId);
    let ride = await rideModel.findById(rideObjectId);
    if (ride.createdBy != req.user._id && ride.driverId != req.user._id) {
      return res.status(400).send({
        message: "only driver or customer can see the ride details!!",
      });
    }

    // ride driver
    let driverdetails = null
    if(ride.driverId) {
      driverdetails = await userModel.findById(ride.driverId);
    }

    return res.status(200).send({
      message: "ride id fetched successfully",
      data: ride,
      driverDetails: driverdetails,
      isDriver: ride.driverId == req.user._id
    });
  } catch (e) {
    console.log(e)
    return res.status(500).send({
      message: "exception occurred while getting ride details",
    });
  }
}
async function addRatingToRide(req, res) {
  try {
    const { rating, rideId } = req.body;
    const user = req.user;
    const rideObjectId = new mongoose.Types.ObjectId(rideId);

    const ride = await rideModel.findById(rideObjectId);
    let updateObj = {};
    
    if (ride.createdBy == user._id) {
      updateObj = {
        ...updateObj,
        driverRating: rating,
      };
    } else if (ride.driverId == user._id) {
      updateObj = {
        ...updateObj,
        customerRating: rating,
      };
    } else {
      return res.status(400).send({
        message:
          "driver can add customer rating or cuetomer can add driver rating. The requested case is not allowed!!",
      });
    }

    await rideModel.findByIdAndUpdate(rideObjectId, updateObj);
    return res.status(200).send({
      message: "ratings added successfully!!!",
    });
  } catch (e) {
    console.log(e)
    return res.status(500).send({
      message: "exception occurred while adding review",
    });
  }
}
module.exports = { createRide, changeStatus, addRatingToRide, getStatus };
