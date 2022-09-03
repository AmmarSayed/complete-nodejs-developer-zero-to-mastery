require("dotenv").config();
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
  .then(() => console.log("Connected successfully"))
  .catch((err) => console.log(err));

module.exports = mongoose;
