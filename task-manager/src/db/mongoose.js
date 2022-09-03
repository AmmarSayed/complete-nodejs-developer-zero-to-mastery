require("dotenv").config();
const { ServerApiVersion } = require("mongodb");

const mongoose = require("mongoose");

const databaseName = "task-manager";

const uri = process.env.MONGO_URI;

mongoose
  .connect(uri, {
    dbName: databaseName,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverApi: ServerApiVersion.v1,
  })
  .then(() => {
    console.log("Connected successfully");
  })
  .catch((err) => console.log(err));

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
const Task = mongoose.model("Task", taskSchema);

const myTask = new Task({
  description: "  Preparing for Friday!             ",
});

module.exports = mongoose;
