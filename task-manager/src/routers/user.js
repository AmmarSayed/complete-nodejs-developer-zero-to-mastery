const express = require("express");
const User = require("../models/user");
const router = new express.Router();

// create a new user
router.post("/users", async (req, res) => {
  try {
    const user = await new User(req.body).save();
    // generate JWT
    const token = await user.generateAuthToken();

    res.status(201).send({ user, token });
  } catch (error) {
    res.status(500).send({ message: "Wrong Entery", error });
  }
});

router.post("/users/login", async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );

    // generate JWT
    const token = await user.generateAuthToken();

    await res.send({ user, token });
  } catch (error) {
    res.status(400).send(error);
  }
});

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

router.patch("/users/:id", async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["name", "email", "password", "age"];

  const isValidOperation = updates.every((item) =>
    allowedUpdates.includes(item)
  );

  if (!isValidOperation)
    return res.status(400).send({ Error: "invalid updates" });
  try {
    /////////
    // findByIdAndUpdate will not trigger the middleware which we need for password hashing
    /////////
    // const latestUserData = await User.findByIdAndUpdate(
    //   req.params.id,
    //   req.body,
    //   { new: true, runValidators: true }
    // );

    const user = await User.findById(req.params.id);

    if (!user) res.status(404).send();
    updates.forEach((update) => (user[update] = req.body[update]));
    await user.save();

    res.send(user);
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
