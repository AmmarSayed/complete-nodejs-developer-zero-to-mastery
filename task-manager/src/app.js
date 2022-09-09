require("dotenv").config();
require("./db/mongoose.js");
const express = require("express");
const userRouter = require("./routers/user");
const taskRouter = require("./routers/tasks");
/////////////////////////////

const app = express();

/////////////////////////////// With middleware: new request --> do somthing --> run router handler

/////////////////////////////
// allow express to read the incoming JSON data, and parse it to an object to the req.body
app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

/////////////////////////////
module.exports = app;
