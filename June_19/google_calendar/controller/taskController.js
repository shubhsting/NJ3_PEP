const taskModel = require("../model/taskModel");

async function createTask(req, res) {
  try {
    const { title, description, startTime } = req.body;

    const task = await taskModel.create({
      description,
      startTime,
      title,
      userId: req.user._id,
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

async function getTasks(req, res) {
  try {
    const { start, end } = req.body;
    const tasks = await taskModel.find({
      userId: req.user._id,
      startTime: { $gte: start, $lte: end },
    });

    // const query = taskModel.find();
    // query.collection(taskModel.collection);

    // const tasks = await query.where('startTime').gte(start).lte(end).exec(callback);

    return res.status(200).send({
      message: "tasks fetched successfully",
      tasks,
    });
  } catch (e) {
    return res.status(500).send({
      message: "exception occured suring get task",
    });
  }
}
async function deleteTask(req, res) {
  try {
    const { taskId } = req.params;
    const task = await taskModel.findById(taskId);

    if (task.userId != req.user._id) {
      return res.status(401).send({
        message: "This user is not authorised to delete this task",
      });
    }
    await taskModel.findByIdAndDelete(taskId);
    return res.status(200).send({
      message: "task deleted!!!",
    });
  } catch (e) {
    return res.status(500).send({
      message: "exception occured during delete task",
    });
  }
}

module.exports = { createTask, updateTask, getTasks, deleteTask };
