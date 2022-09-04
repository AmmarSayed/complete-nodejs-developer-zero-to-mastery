require("dotenv").config();
require("./db/mongoose.js");
const User = require("./models/user");
const Task = require("./models/task");
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

// allow express to read the incoming JSON data, and parse it to an object to the req.body
app.use(express.json());

app.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    res.send(users);
  } catch (error) {
    res.status(500).send({ message: "Service is currently down", error });
  }
});

app.get("/users/:id", async (req, res) => {
  const _id = req.params.id;
  try {
    const user = User.findById(_id);
    if (!user) return res.status(404).send();
    res.send(user);
  } catch (err) {
    res.status(500).send({ message: "Error", err });
  }
});

app.post("/users", async (req, res) => {
  try {
    const user = await new User(req.body).save();
    res.status(201).send({ message: "Success", user });
  } catch (error) {
    res.status(500).send({ message: "Wrong Entery", error });
  }
});

app.get("/tasks", async (req, res) => {
  try {
    const tasks = await Task.find();
    res.send(tasks);
  } catch (error) {
    res.status(500).send();
  }
});

app.get("/tasks/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const task = await Task.findById(_id);
    if (!task) return res.status(404).send();

    res.send(task);
  } catch (error) {
    res.status(500).send();
  }
});

app.post("/tasks", async (req, res) => {
  try {
    const task = await new Task(req.body).save();
    res.status(201).send({ message: "Success", task });
  } catch (error) {
    res.status(400).send({ message: "Error", err });
  }
});

app.listen(PORT, () =>
  console.log(`Server is running on port ${PORT}...🏃‍♂️🏃‍♂️🏃‍♂️`)
);
