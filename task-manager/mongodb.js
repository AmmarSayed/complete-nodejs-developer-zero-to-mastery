// CRUD Operations
require("dotenv").config();
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const uri = process.env.MONGO_URI;
const databaseName = "task-manager";
const collectionName = "users";

const id = new ObjectId();
console.log(id);
console.log(id.getTimestamp());
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

const run = async () => {
  try {
    const db = client.db(databaseName);

    const result = await db
      .collection(collectionName)
      .findOne({ _id: new ObjectId("630f79f1162129d964d9ebdd") });

    console.log(result);
    const data = await db
      .collection("tasks")
      .find({ completed: false })
      .toArray();

    console.log(data.length);
  } catch (error) {
    return console.log("unable to connect to data base", error);
  } finally {
    await client.close();
  }
};

run();
