const mongoose = require("mongoose");
const connectToDB = require("./config");
require("dotenv").config();

const restaurantSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  completeAddress: {
    type: String,
  },
  slug: {
    type: String,
  },
  geoCompleteAddress: {
    type: {
      type: String, // Don't do `{ location: { type: String } }`
      enum: ["Point"], // 'location.type' must be 'Point'
      required: true,
    },
    coordinates: {
      type: [Number],
      required: true,
    },
  },
  contact_no: {
    type: Number,
  },
  landline: {
    type: Number,
  },
  owner_name: {
    type: String,
  },
  owner_phone: {
    type: Number,
  },
  owner_email: {
    type: String,
  },
  popularDishes: {
    type: [String],
  },
  openingHours: [
    // [{"day": "sunday", status: "Open", timeRange: [4 am to 7 am, 8 am to 11 am, 3pm to 9 pm ]}, {day: monday, status:closed, timeRange: []}]
    {
      day: {
        type: String,
        enum: [
          "Sunday",
          "Monday",
          "Tuesday",
          "wednesday",
          "thursday",
          "friday",
          "saturday",
        ],
      },
      status: {
        type: String,
        enum: ["Open", "Closed"],
      },
      timeRange: [String], // [4 am to 7 am, 8 am to 11 am, 3pm to 9 pm ]
    },
  ],
  photos: {
    type: [String],
  },
  created_by: {
    type: String,
  },
  more_info: {
    type: [String],
  },
});

const restaurantModel = mongoose.model(
  "restaurantCollection_Zomato",
  restaurantSchema
);

connectToDatabaseAndCreateIndex();

async function connectToDatabaseAndCreateIndex() {
  await connectToDB();

  try {
    const indexcreate = await restaurantModel.collection.createIndex({
      geoCompleteAddress: "2dsphere",
    });
    console.log("restaurant index created!!!", indexcreate)
  } catch (e) {
    console.log("exception occurred while creating index in restaurant model");
  }
}

module.exports = restaurantModel;
