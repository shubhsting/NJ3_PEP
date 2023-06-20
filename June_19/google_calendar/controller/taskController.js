const taskModel = require("../model/taskModel");

async function createTask(req, res) {
  try {
    const { description, startTime } = req.body;

    const task = await taskModel.create({
      description,
      startTime,
      userId: req.user.id,
    });

    return res.status(200).send({
      message: "task created successfully!!",
      task: task,
    });
  } catch (e) {
    return res.status(500).send({
      message: "error occurred while creating task",
      error: e,
    });
  }
}

async function updateTask(req, res) {
  try {
    const { taskId } = req.params;
    const { description, startTime } = req.body;

    const task = await taskModel.findById(taskId);

    if (task.userId != req.user._id) {
      return res.status(401).send({
        message: "This user is not authorised to update this task",
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
    await taskModel.findByIdAndUpdate(taskId, updateObj);
    return res.status(200).send({
      message: "task have been updated successfully",
    });
  } catch (e) {
    return res.status(500).send({
      message: "exception occurred while updating task",
    });
  }
}

async function deleteTask(req, res) {}

module.exports = { createTask, updateTask };
