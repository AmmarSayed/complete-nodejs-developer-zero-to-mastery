require("dotenv").config();
require("./db/mongoose.js");
const express = require("express");
const userRouter = require("./routers/user");
const taskRouter = require("./routers/tasks");

/////////////////////////////

const app = express();

const PORT = process.env.PORT || 3000;

/////////////////////////////// With middleware: new request --> do somthing --> run router handler

// allow express to read the incoming JSON data, and parse it to an object to the req.body
app.use(express.json());
app.use(userRouter);
app.use(taskRouter);
/////////////////////////////

/////////////////////////////
app.listen(PORT, () =>
  console.log(`Server is running on port ${PORT}...🏃‍♂️🏃‍♂️🏃‍♂️`)
);

/////////////////////////////

/////////////////////////////
const Task = require("./models/task");
const User = require("./models/user");
const main = async () => {
  // const task = await Task.findById("63152d39200f6a6eeb641f35");
  // await task.populate("owner");
  // console.log(task);
  const user = await User.findById("63152cc596f4265ea209d084");
  await user.populate("tasks");
  console.log(user.tasks);
};
