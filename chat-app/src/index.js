const path = require("path");
const configPath = path.resolve(__dirname, "../config", ".env");
const publicDirectory = path.resolve(__dirname, "../public");
const http = require("http");
const express = require("express");
const app = express();
const server = http.createServer(app);
const socketio = require("socket.io");
const io = new socketio.Server(server);

require("dotenv").config({ path: configPath });
const port = process.env.PORT;

app.use(express.static(publicDirectory));

io.on("connection", (socket) => {
  console.log("a user connected");
  socket.emit("message", "💻 Welcome to Chat App! 💻");
  // send messgae to all exept who joust joined
  socket.broadcast.emit("message", "A new user joined the chat ...");
  socket.on("reply", (reply) => {
    io.emit("message", reply);
  });
  socket.on("disconnect", () => {
    io.emit("message", "A user has left!");
  });

  socket.on("sendGeoLocation", (location) => {
    io.emit("sendGeoLocation", location);
  });
});

server.listen(port, console.log(`Server is runing on port ${port} 🏃‍♂️🏃‍♂️🏃‍♂️`));
