const mongoose = require("mongoose");
const { TaskSchema } = ("../models/Task");

const Task = mongoose.model('Task', TaskSchema);

const addNewTask = (async (req, res) => {
    const newTask = new Task({
        googleId: "test", //Using the same googleId for all tasks until adding googleauth
        title: req.body.title,
        desc: req.body.desc,
        status: false,
    });
    try {
        const savedTask = await newTask.save();
        res.status(200).json(savedTask);
    } catch (err) {
        res.status(500).json(err);
    }
});

const getUserTasks = (async (req, res) => {
    let userGoogleId = req.params.googleId;
    try {
        let tasks;
        if (userGoogleId) {
            tasks = await Task.find({ googleId: userGoogleId });
        }
        else {
            tasks = await Task.find();
        }
        res.status(200).json(tasks);

    } catch (err) {
        res.status(500).json(err)
    }
});

const updateTaskWithId = (async (req, res) => {
    try {
        const updatedTask = await Task.findByIdAndUpdate(
            req.params.taskID,
            {
                $set: req.body,
            },
            { new: true } //return the updated task
        );
        res.status(200).json(updatedTask);
    } catch (err) {
        res.status.json(err);
    }
});

const deleteTaskWithId = (async (req, res) => {
    try {
        await Task.findByIdAndDelete(req.params.taskID);
        res.status(200).json("Task has been deleted...");
    }
    catch (err) {
        res.status(500).json(err);
    }
});





exports.addNewTask = addNewTask;
exports.getUserTasks = getUserTasks;
exports.updateTaskWithId = updateTaskWithId;
exports.deleteTaskWithId = deleteTaskWithId;