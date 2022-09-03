const validator = require("validator");
const mongoose = require("../db/mongoose");

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

  age: {
    type: Number,
    validate(val) {
      if (val < 0) throw new Error("Age must be a positive number!");
    },
    default: 0,
  },
});

// define User model
const User = mongoose.model("User", userSchema);

module.exports = User;
