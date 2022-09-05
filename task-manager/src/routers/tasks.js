const express = require("express");
const Task = require("../models/task");
const User = require("../models/user");
const auth = require("../middleware/auth");
const router = new express.Router();

//create a task
router.post("/tasks", auth, async (req, res) => {
  try {
    const newTask = { ...req.body, owner: req.user._id };
    const task = await new Task(newTask).save();
    res.status(201).send({ message: "Success", task });
  } catch (error) {
    res.status(400).send({ message: "Error", err });
  }
});

// get all tasks for a specific user
router.get("/tasks", auth, async (req, res) => {
  try {
    // const tasks = await Task.find({ owner: req.user._id });
    await req.user.populate("tasks");
    res.send(req.user.tasks);
  } catch (error) {
    res.status(500).send();
  }
});

// get Task by Id
router.get("/tasks/:id", auth, async (req, res) => {
  const _id = req.params.id;

  try {
    const task = await Task.findOne({ _id, owner: req.user._id });
    if (!task) return res.status(404).send();

    res.send(task);
  } catch (err) {
    // handle server realted issue
    res.status(500).send(err);
  }
});

// update task by Id
router.patch("/tasks/:id", auth, async (req, res) => {
  const _id = req.params.id;

  // get the required updated fields from the body
  const updates = Object.keys(req.body);
  const allowedUpdates = ["description", "completed"];

  const isValidOperation = updates.every((item) =>
    allowedUpdates.includes(item)
  );

  if (!isValidOperation) {
    return res.status(400).send({ Error: "invalid updates" });
  }
  try {
    const task = await Task.findOne({ _id, owner: req.user._id });
    if (!task) return res.status(404).send();

    updates.forEach(
      (updateField) => (task[updateField] = req.body[updateField])
    );

    await task.save();

    res.send(task);
  } catch (err) {
    // handle server realted issue
    res.status(500).send(err);
  }
});

// Delete a task
router.delete("/tasks/:id", auth, async (req, res) => {
  try {
    const _id = req.params.id;

    const deletedTask = await Task.findOneAndDelete({
      _id,
      owner: req.user._id,
    });

    if (!deletedTask) return res.status(404).send();

    res.send(deletedTask);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

module.exports = router;
