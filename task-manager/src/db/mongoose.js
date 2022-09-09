require("dotenv").config();
const { ServerApiVersion } = require("mongodb");

const mongoose = require("mongoose");

const uri = process.env.MONGO_URI;

mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverApi: ServerApiVersion.v1,
  })
  .then(() => console.log("Connected to Database successfully"))
  .catch((err) => console.log(err));

module.exports = mongoose;
