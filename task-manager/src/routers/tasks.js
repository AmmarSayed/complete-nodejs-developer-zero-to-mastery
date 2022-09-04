const express = require("express");
const Task = require("../models/task");

const router = new express.Router();

router.get("/tasks", async (req, res) => {
  try {
    const tasks = await Task.find();
    res.send(tasks);
  } catch (error) {
    res.status(500).send();
  }
});

router.get("/tasks/:id", async (req, res) => {
  if (!isValidOperation)
    return res.status(400).send({ Error: "invalid updates" });

  try {
    const _id = req.params.id;
    const task = await Task.findById(_id);
    if (!task) return res.status(404).send();

    res.send(task);
  } catch (err) {
    // handle server realted issue
    res.status(500).send(err);
  }
});

router.post("/tasks", async (req, res) => {
  try {
    const task = await new Task(req.body).save();
    res.status(201).send({ message: "Success", task });
  } catch (error) {
    res.status(400).send({ message: "Error", err });
  }
});

router.patch("/tasks/:id", async (req, res) => {
  // get the required updated fields from the body
  const updates = Object.keys(req.body);
  const allowedUpdates = ["description", "completed"];

  const isValidOperation = updates.every((item) =>
    allowedUpdates.includes(item)
  );

  if (!isValidOperation)
    return res.status(400).send({ Error: "invalid updates" });

  try {
    // const latestTaskData = await Task.findByIdAndUpdate(
    //   req.params.id,
    //   req.body,
    //   { new: true, runValidators: true }
    // );

    const task = await Task.findById(req.params.id);

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

router.delete("/tasks/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const deletedTask = await Task.findByIdAndDelete(id);
    if (!deletedTask) return res.status(404).send();
    res.send(deletedTask);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
