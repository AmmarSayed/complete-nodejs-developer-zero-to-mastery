require("dotenv").config();
require("./db/mongoose.js");
const User = require("./models/user");
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

// allow express to read the incoming JSON data, and parse it to an object to the req.body
app.use(express.json());

app.get("/users", (req, res) => {
  res.send("testing");
});

app.post("/users", (req, res) => {
  const user = new User(req.body);
  user
    .save()
    .then((data) => {
      res.send({ message: "Success", data });
    })
    .catch((error) => res.status(400).send({ message: "Wrong Entery", error }));
});

app.listen(PORT, () =>
  console.log(`Server is running on port ${PORT}...🏃‍♂️🏃‍♂️🏃‍♂️`)
);
