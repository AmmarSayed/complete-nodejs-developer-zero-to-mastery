const mongoose = require("../db/mongoose");

// define task Schema
const taskSchema = new mongoose.Schema({
  description: {
    type: String,
    trim: true,
    required: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
});

// define Task model
const Task = new mongoose.model("Task", taskSchema);

module.exports = Task;
