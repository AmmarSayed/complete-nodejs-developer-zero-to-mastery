require("../src/db/mongoose");
const Task = require("../src/models/task");

const _id = "631321f274231114469037b6";

Task.findByIdAndDelete(_id)
  .then((task) => {
    console.log(task);
    return Task.countDocuments({ completed: false });
  })
  .then((count) => console.log(count))
  .catch((err) => console.log(err));
