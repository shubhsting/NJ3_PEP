const eventModel = require("../model/eventModel");

async function createEvent(req, res) {
  try {
    const { description, startTime, endTime, location, guests, link } =
      req.body;

    const task = await eventModel.create({
      description,
      startTime,
      endTime,
      location,
      guests,
      link,
      userId: req.user._id,
    });

    return res.status(200).send({
      message: "event created successfully!!",
      task: task,
    });
  } catch (e) {
    return res.status(500).send({
      message: "error occurred while creating event",
      error: e,
    });
  }
}

async function updateEvent(req, res) {
  try {
    const { eventId } = req.params;
    const { description, startTime, endTime, location, guests } = req.body;

    const event = await eventModel.findById(eventId);

    if (event.userId != req.user._id) {
      return res.status(401).send({
        message: "This user is not authorised to update this event",
      });
    }
    let updateObj = {};
    if (startTime) {
      updateObj = {
        ...updateObj,
        startTime,
      };
    }
    if (description) {
      updateObj = {
        ...updateObj,
        description,
      };
    }
    if (endTime) {
      updateObj = {
        ...updateObj,
        endTime,
      };
    }
    if (location) {
      updateObj = {
        ...updateObj,
        location,
      };
    }
    await eventModel.findByIdAndUpdate(eventId, updateObj);
    return res.status(200).send({
      message: "event have been updated successfully",
    });
  } catch (e) {
    return res.status(500).send({
      message: "exception occurred while updating event",
    });
  }
}

async function getEvents(req, res) {
  try {
    const { start, end } = req.body;
    const events = await eventModel.find({
      userId: req.user._id,
      startTime: { $gte: start, $lte: end },
    });

    // const query = taskModel.find();
    // query.collection(taskModel.collection);

    // const tasks = await query.where('startTime').gte(start).lte(end).exec(callback);

    return res.status(200).send({
      message: "events fetched successfully",
      events,
    });
  } catch (e) {
    return res.status(500).send({
      message: "exception occured suring get event",
    });
  }
}

async function deleteEvent(req, res) {
  try {
    const { eventId } = req.params;
    const event = await eventModel.findById(eventId);

    if (event.userId != req.user._id) {
      return res.status(401).send({
        message: "This user is not authorised to delete this event",
      });
    }
    await eventModel.findByIdAndDelete(eventId);
    return res.status(200).send({
      message: "event deleted!!!",
    });
  } catch (e) {
    return res.status(500).send({
      message: "exception occured during delete event",
    });
  }
}

module.exports = { createEvent, updateEvent, deleteEvent, getEvents };
