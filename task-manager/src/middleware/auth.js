require("dotenv").config();
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ _id: decoded, "tokens.token": token });
    if (!user) throw new Error();

    // we add a "user" property to the request and send back the data of that user
    req.user = user;
    req.usedToken = token;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).send({ error: "please authenticate" });
  }
};

module.exports = auth;
