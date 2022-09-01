require("dotenv").config();
const validator = require("validator");
const { ServerApiVersion } = require("mongodb");

const mongoose = require("mongoose");
const databaseName = "task-manager";

const uri = process.env.MONGO_URI;

mongoose
  .connect(uri, {
    dbName: databaseName,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverApi: ServerApiVersion.v1,
  })
  .then(() => {
    console.log("Connected successfully");
  })
  .catch((err) => console.log(err));

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },

  email: {
    type: String,
    required: true,
    validate(val) {
      if (!validator.isEmail(val)) throw new Error("Invalid Email");
    },
    lowercase: true,
  },

  age: {
    type: Number,
    validate(val) {
      if (val < 0) throw new Error("Age must be a positive number!");
    },
    default: 0,
  },

  password: {
    type: String,
    minlength: 7,
    validate(val) {
      if (val.toLowerCase().includes("password"))
        throw new Error(`Invalid password, cannot contain "password"`);
    },
    trim: true,
    required: true,
  },
});

// define task Schema
const taskSchema = new mongoose.Schema({
  description: {
    type: String,
    trim: true,
    required: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
});

// define User model
const User = mongoose.model("User", userSchema);

// define Task model
const Task = mongoose.model("Task", taskSchema);

// using models
const me = new User({
  name: "Ammar Sayed",
  age: 34,
  email: "ammarsayed1988@gmail.com",
  password: "N0tAP@55w0rd",
});

const myTask = new Task({
  description: "  Preparing for Friday!             ",
});

//
myTask
  .save()
  .then((data) => console.log(data))
  .catch((err) => console.log("Error 💥: ", err, " 💥"));
