const express = require("express");
const User = require("../models/user");
const router = new express.Router();

router.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    res.send(users);
  } catch (error) {
    res.status(500).send({ message: "Service is currently down", error });
  }
});

router.get("/users/:id", async (req, res) => {
  const _id = req.params.id;
  try {
    const user = User.findById(_id);
    if (!user) return res.status(404).send();
    res.send(user);
  } catch (err) {
    res.status(500).send({ message: "Error", err });
  }
});

router.post("/users", async (req, res) => {
  try {
    const user = await new User(req.body).save();
    res.status(201).send({ message: "Success", user });
  } catch (error) {
    res.status(500).send({ message: "Wrong Entery", error });
  }
});

router.patch("/users/:id", async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["name", "email", "password", "age"];

  const isValidOperation = updates.every((item) =>
    allowedUpdates.includes(item)
  );

  if (!isValidOperation)
    return res.status(400).send({ Error: "invalid updates" });
  try {
    const latestUserData = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!latestUserData) res.status(404).send();

    res.send(latestUserData);
  } catch (error) {
    //handling validation errors
    res.status(400).send(error);
  }
});

router.delete("/users/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) return res.status(404).send();
    res.send(deletedUser);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
