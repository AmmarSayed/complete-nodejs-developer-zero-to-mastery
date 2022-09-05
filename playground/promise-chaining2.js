require("../src/db/mongoose");
const Task = require("../src/models/task");

const _id = "63133a3868e52950352d5062";

// Task.findByIdAndDelete(_id)
//   .then((task) => {
//     console.log(task);
//     return Task.countDocuments({ completed: false });
//   })
//   .then((count) => console.log(count))
//   .catch((err) => console.log(err));

const deleteTaskAndCount = async (id) => {
  await Task.findByIdAndDelete(id);
  const count = Task.countDocuments({ completed: false });

  return count;
};

deleteTaskAndCount(_id)
  .then((count) => console.log(count))
  .catch((err) => console.log(err));
