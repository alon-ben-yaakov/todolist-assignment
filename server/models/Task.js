const mongoose = require('mongoose')

const TaskSchema = new mongoose.Schema({
  googleId: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
  status: {
    type: Boolean,
    require: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

exports.TaskSchema = mongoose.model('Task', TaskSchema)