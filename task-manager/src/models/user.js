const validator = require("validator");
const mongoose = require("../db/mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

////////////////////
const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },

  email: {
    type: String,
    unique: true,
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
  tokens: [
    {
      token: { type: String, required: true },
    },
  ],
});

// define our own method on the userSchema to allow finding user by email and password
userSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({ email });

  if (!user) throw new Error("Unable to login");

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) throw new Error("Unable to login!");

  return user;
};

// Create JWT Token
userSchema.methods.generateAuthToken = async function () {
  const user = this;
  const token = jwt.sign({ _id: user._id.toString() }, "thisIsNewUser");

  user.tokens = user.tokens.concat({ token });
  await user.save();
  return token;
};

// has the password on entering / changing the password field
userSchema.pre("save", async function (next) {
  const user = this;

  if (user.isDirectModified("password")) {
    user.password = await bcrypt.hash(user.password, 10);
  }

  next();
});
// define User model
const User = mongoose.model("User", userSchema);

module.exports = User;
