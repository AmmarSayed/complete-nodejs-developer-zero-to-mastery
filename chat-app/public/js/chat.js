const socket = io();
const increment = document.querySelector("#increment");
let count = 0;
increment.addEventListener("click", () => {
  socket.emit("increment", count);
});

socket.on("countUpdated", (count) => {
  console.log("The count is updated", count);
});
