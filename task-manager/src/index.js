require("dotenv").config();
require("./db/mongoose.js");
const User = require("./models/user");
const Task = require("./models/task");
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

// allow express to read the incoming JSON data, and parse it to an object to the req.body
app.use(express.json());

app.get("/users", (req, res) => {
  User.find()
    .then((users) => {
      res.send(users);
    })
    .catch((error) =>
      res.status(500).send({ message: "Service is currently down", error })
    );
});

app.get("/users/:id", (req, res) => {
  const _id = req.params.id;

  User.findById(_id)
    .then((user) => {
      if (!user) return res.status(404).send();
      res.send(user);
    })
    .catch((err) => res.status(500).send({ message: "Error", err }));
});

app.post("/users", (req, res) => {
  const user = new User(req.body);
  user
    .save()
    .then((data) => res.status(201).send({ message: "Success", data }))
    .catch((error) => res.status(500).send({ message: "Wrong Entery", error }));
});

app.get("/tasks", (req, res) => {
  Task.find()
    .then((tasks) => res.send(tasks))
    .catch((err) => res.status(500).send());
});

app.get("/tasks/:id", (req, res) => {
  const _id = req.params.id;

  Task.findById(_id)
    .then((task) => {
      if (!task) return res.status(404).send();
      res.send(task);
    })
    .catch((err) => res.status(500).send());
});

app.post("/tasks", (req, res) => {
  const task = new Task(req.body);
  task
    .save()
    .then((data) => res.status(201).send({ message: "Success", data }))
    .catch((err) => res.status(400).send({ message: "Error", err }));
});

app.listen(PORT, () =>
  console.log(`Server is running on port ${PORT}...🏃‍♂️🏃‍♂️🏃‍♂️`)
);
