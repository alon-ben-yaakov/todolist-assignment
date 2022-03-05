const routes = require('express').Router({ mergeParams: true });
let Task = require('../models/Task');
const { addNewTask, getUserTasks, updateTaskWithId, deleteTaskWithId } = require('../controllers/task');
// const {isUserAuthenticated} = require("../middleware/auth"); implement this auth middleware when googleAuth is on



// @desc    Get user's tasks
// @route   GET api/task/:googleId
routes.route("/:googleId")
    .get(getUserTasks);


// @desc    Create task
// @route   POST api/task
routes.route('/').post(addNewTask);//@function: Using the function from the Task.js controller


// @desc    delete & patch fuctions
// @route   api/task/:taskID
routes.route("/:taskID")
    .patch(updateTaskWithId)//@function: Updates the Task with the new data 
    .delete(deleteTaskWithId);//@function: Delete Task with the given taskID


module.exports = routes;