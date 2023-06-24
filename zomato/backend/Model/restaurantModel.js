const mongoose = require("mongoose");
require("dotenv").config();

mongoose
  .connect(process.env.CONNECTION_URL)
  .then(() => console.log("Connected!"));

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
    },
    coordinates: {
      type: [Number],
    }
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

module.exports = restaurantModel;
