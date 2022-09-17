const users = [];

// addUser, removeUser, getUser, getUserInRoom

const addUser = ({ id, username, room }) => {
  // clean the data
  username = username.trim().toLowerCase();
  room = room.trim().toLowerCase();

  // validate data

  if (!room || !username) {
    return { error: "Username and room are required" };
  }

  // check for existing user
  const existingUser = users.find((user) => user.room === room && user.username === username);

  // validate username
  if (existingUser) {
    return { error: "username is in use!" };
  }

  // store user
  const user = { id, username, room };

  users.push(user);

  return { user };
};

const removeUser = (id) => {
  const userindex = users.findIndex((user) => user.id === id);
  if (userindex < 0) return { error: "invalid user id!" };
  return users.splice(userindex, 1)[0];
};

const getUser = (id) => {
  return users.find((user) => user.id === id);
};

const getUsersInRoom = (room) => {
  if (!room) return;
  room = room.trim().toLowerCase();
  return users.filter((user) => user.room === room);
};

// addUser({ id: 556, username: "Ammar", room: "Alex" });
// addUser({ id: 225, username: "Ali", room: "Alex" });
// addUser({ id: 225, username: "Ahmed", room: "Cairo" });
// addUser({ id: 225, username: "Hany", room: "Cairo" });
// addUser({ id: 225, username: "Ali", room: "Cairo" });

// console.log(getUser(556));
// console.log(getUsersInRoom("Cairo"));

module.exports = { addUser, removeUser, getUser, getUsersInRoom };
