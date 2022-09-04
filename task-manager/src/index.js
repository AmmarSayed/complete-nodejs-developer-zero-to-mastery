require("dotenv").config();
require("./db/mongoose.js");
const express = require("express");
const userRouter = require("./routers/user");
const taskRouter = require("./routers/tasks");
/////////////////////////////

const app = express();

const PORT = process.env.PORT || 3000;

/////////////////////////////
// allow express to read the incoming JSON data, and parse it to an object to the req.body
app.use(express.json());
app.use(userRouter);
app.use(taskRouter);
/////////////////////////////

/////////////////////////////
app.listen(PORT, () =>
  console.log(`Server is running on port ${PORT}...🏃‍♂️🏃‍♂️🏃‍♂️`)
);

const jwt = require("jsonwebtoken");

const myFunction = async () => {
  const token = jwt.sign({ _id: "abcd" }, "thisIsShitty", {
    expiresIn: "7 days",
  });
  console.log(token);

  const data = jwt.verify(token, "thisIsShitty");
  console.log(data);
};

// myFunction();
