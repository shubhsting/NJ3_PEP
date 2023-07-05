const mongoose = require("mongoose");
const createConnection = require("./config");

const rideSchema = new mongoose.Schema({
  start: {
    type: String
  },
  end: {
    type: String
  },
  startLocation: {
    type: {
      type: String,
      enum: ["Point"],
      required: true,
    },
    coordinates: {
      type: [Number],
      required: true,
    },
  },
  endLocation: {
    type: {
      type: String,
      enum: ["Point"],
      required: true,
    },
    coordinates: {
      type: [Number],
      required: true,
    },
  },
  status: {
    type: String,
    enum: [
      "CREATED",
      "ACCEPTED_BY_DRIVER_ON_HIS_WAY",
      "REACHED_LOCATION",
      "STARTED",
      "ENDED",
    ],
  },
  creationTime: {
    type: Date
  },
  startTime: {
    type: Date,
  },
  estimatedFare: {
    type: Number, //12 rs/km
  },
  endTime: {
    type: Date,
  },
  estimatedArrivalTime: {
    type: Number,
  },
  estimatedTravelTime: {
    type: Number, // 5 minutes/km
  },
  driverId: {
    type: String,
  },
  totalFare: {
    type: Number,
  },
  driverRating: {
    type: Number,
    min: 0,
    max: 5,
  },
  customerRating: {
    type: Number,
    min: 0,
    max: 5,
  },
  createdBy:{
    type: String
  },
  distanceInKm: {
    type: Number
  }
});

const rideModel = mongoose.model("rideCollection_Uber", rideSchema);

async function createIndex() {
  await createConnection();
  try {
    const startLocationIndex = await rideModel.collection.createIndex({
      startLocation: "2dsphere",
    });

    const endLocationIndex = await rideModel.collection.createIndex({
      endLocation: "2dsphere",
    });
    console.log(
      `indices created for ride model ${startLocationIndex} and ${endLocationIndex}`
    );
  } catch (e) {
    console.log(`failed to create index in ride model`);
  }
}

createIndex()
module.exports = rideModel;
