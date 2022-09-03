require("dotenv").config();
const { ServerApiVersion } = require("mongodb");

const mongoose = require("mongoose");

const databaseName = "task-manager";

const uri =
  process.env.MONGO_URI ||
  "mongodb+srv://ammar:A123456e@cluster0.3foql77.mongodb.net/?retryWrites=true&w=majority";

mongoose
  .connect(uri, {
    dbName: databaseName,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverApi: ServerApiVersion.v1,
  })
  .then(() => console.log("Connected to Database successfully"))
  .catch((err) => console.log(err));

module.exports = mongoose;
