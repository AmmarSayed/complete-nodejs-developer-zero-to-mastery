require("dotenv").config();

require("../src/db/mongoose");
const User = require("../src/models/user");

const _id = "63131ed62f787076325d42fa";

// User.findByIdAndUpdate(_id, { age: 30 })
//   .then((user) => {
//     console.log(user);
//     return User.countDocuments({ age: 30 });
//   })
//   .then((result) => console.log(result));

const updateAgeAndCount = async (id, age) => {
  const user = await User.findByIdAndUpdate(id, { age });
  const count = await User.countDocuments({ age });

  return count;
};

updateAgeAndCount(_id, 20)
  .then((count) => console.log(count))
  .catch((err) => console.log(err));
