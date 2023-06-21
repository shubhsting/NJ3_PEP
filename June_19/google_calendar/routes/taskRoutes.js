const express = require("express");
const {
  createTask,
  updateTask,
  getTasks,
  deleteTask,
} = require("../controller/taskController");

const taskRoutes = express.Router();
const userAuth = require("../middleware/userAuth");

taskRoutes.post("/create", userAuth, createTask);
taskRoutes.post("/:taskId/update", userAuth, updateTask);
taskRoutes.get("/fetch", userAuth, getTasks);
taskRoutes.delete("/:taskId", userAuth, deleteTask);

module.exports = taskRoutes;
