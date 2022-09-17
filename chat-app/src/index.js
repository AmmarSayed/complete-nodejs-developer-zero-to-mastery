const path = require("path");
const configPath = path.resolve(__dirname, ".env");
const publicDirectory = path.resolve(__dirname, "../public");
const http = require("http");
const express = require("express");
const app = express();
const server = http.createServer(app);
const socketio = require("socket.io");
const io = new socketio.Server(server);
const Filter = require("bad-words");
const { generateMessage } = require("./utils/messages");
const { addUser, removeUser, getUser, getUsersInRoom } = require("./utils/users");
require("dotenv").config({ path: configPath });
const port = process.env.PORT;

//////////////////////
app.use(express.static(publicDirectory));

//////////////////////
io.on("connection", (socket) => {
  // action on somebody joins a sepcific room
  socket.on("join", ({ username, room }, callback) => {
    const { error, user } = addUser({ id: socket.id, username, room });

    if (error) return callback(error);

    socket.join(user.room);

    // io.to.emit --> send message to every one, on a specific room,
    // socket.broadcast.to.emit --> send message to every one, on a specific room except who just joined / client

    // send a welcome message on joining this socket
    socket.emit("message", generateMessage("Admin", `Welcome ${user.username}!`));

    // send messgae to all subscribers exept who joust joined
    socket.broadcast.to(user.room).emit("message", generateMessage("Admin", `${user.username} has joined!`));

    // send message to everyone in the same room
    io.to(user.room).emit("roomData", {
      room: user.room,
      users: getUsersInRoom(user.room),
    });

    callback();
  });

  socket.on("reply", (reply, callback) => {
    const user = getUser(socket.id);

    if (!user || !user.room || !user.username) return callback("invalid, please rejoin!");
    const filter = new Filter();
    if (filter.isProfane(reply)) {
      return callback("Porfanity is not allowed!");
    }

    if (!reply) {
      return callback("No message provided");
    }

    io.to(user.room).emit("message", generateMessage(user.username, reply));
    callback();
  });

  socket.on("sendLocation", ({ latitude, longitude }, callback) => {
    const user = getUser(socket.id);

    const linkOnMap = `https://google.com/maps?q=${latitude},${longitude}`;

    if (!latitude || !longitude) {
      return callback("error");
    }

    io.to(user.room).emit("locationMessage", generateMessage(user.username, linkOnMap));
    callback();
  });

  socket.on("disconnect", () => {
    const user = removeUser(socket.id);
    if (!user) return;
    io.to(user.room).emit("message", generateMessage("Admin", `${user.username} has left!`));

    // send message to everyone in the same room
    io.to(user.room).emit("roomData", {
      room: user.room,
      users: getUsersInRoom(user.room),
    });
  });
});

server.listen(port, console.log(`Server is runing on port ${port} 🏃‍♂️🏃‍♂️🏃‍♂️`));
