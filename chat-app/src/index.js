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

let count = 0;

io.on("connection", (socket) => {
  console.log("a user connected");
  socket.emit("countUpdated", count);

  socket.on("increment", () => {
    count++;
    // socket.emit("countUpdated", count);
    io.emit("countUpdated", count);
  });
});

server.listen(port, console.log(`Server is runing on port ${port} 🏃‍♂️🏃‍♂️🏃‍♂️`));
