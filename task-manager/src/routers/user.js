const express = require("express");
const User = require("../models/user");
const router = new express.Router();
const auth = require("../middleware/auth");

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

// router.get("/users", auth, async (req, res) => {
//   try {
//     const users = await User.find();
//     res.send(users);
//   } catch (error) {
//     res.status(500).send({ message: "Service is currently down", error });
//   }
// });

// check if the user is authenticated first, then send the user profile
router.get("/users/me", auth, async (req, res) => {
  res.send(req.user);
});

// Logout
router.post("/users/logout", auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter(
      ({ token }) => token !== req.usedToken
    );

    await req.user.save();

    res.send();
  } catch (error) {
    console.log(error);
    res.status(500).send();
  }
});

// Logout All
router.post("/users/logoutAll", auth, async (req, res) => {
  try {
    req.user.tokens = [];
    await req.user.save();

    res.send();
  } catch (error) {
    console.log(error);
    res.status(500).send();
  }
});

/*

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


*/

// update user
router.patch("/users/me", auth, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["name", "email", "password", "age"];

  const isValidOperation = updates.every((item) =>
    allowedUpdates.includes(item)
  );

  if (!isValidOperation)
    return res.status(400).send({ Error: "invalid updates" });

  try {
    updates.forEach((update) => (req.user[update] = req.body[update]));
    await req.user.save();

    res.send(req.user);
  } catch (error) {
    //handling validation errors
    res.status(400).send(error);
  }
});

// delete user
router.delete("/users/me", auth, async (req, res) => {
  try {
    await req.user.remove();
    res.send(req.user);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
