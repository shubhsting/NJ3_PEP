const express = require("express");
const userAuth = require("../middleware/userAuth");
const {
  getEvents,
  updateEvent,
  deleteEvent,
  createEvent,
} = require("../controller/eventController");

const eventRouter = express.Router();


eventRouter.post("/create", userAuth, createEvent);
eventRouter.get("/fetch", userAuth, getEvents);
eventRouter.post("/:eventId/update", userAuth, updateEvent);
eventRouter.delete("/:eventId", userAuth, deleteEvent);


module.exports = eventRouter;
