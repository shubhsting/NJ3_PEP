const taskModel = require("../model/taskModel");

async function createTask(req, res) {

    try{
        const {description, startTime} = req.body;
    
        const task = await taskModel.create({description, startTime, userId: req.user.id})
    
        return res.status(200).send({
            message: "task created successfully!!",
            task: task
        })
    } catch(e) {
        return res.status(500).send({
            message: "error occurred while creating task",
            error: e
        })
    }
   
}


async function updateTask(req, res) {
    
}


async function deleteTask(req, res) {
    
}


module.exports = {createTask}