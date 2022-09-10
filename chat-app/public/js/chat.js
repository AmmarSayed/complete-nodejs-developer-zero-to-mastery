const socket = io();

const root = document.querySelector("#root");
const messageFom = document.querySelector("#messageForm");
const btnSendLocation = document.querySelector("#send-location");

socket.on("message", (message) => {
  root.insertAdjacentHTML("afterbegin", `<p>${message}</p>`);
});

messageFom.addEventListener("submit", (e) => {
  e.preventDefault();
  const textMessage = e.target.elements.messageBox;

  socket.emit("reply", textMessage.value);
  textMessage.value = "";
});

btnSendLocation.addEventListener("click", () => {
  const success = (position) => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const linkOnMap = `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`;

    socket.emit("reply", `My Location: Latitude: ${latitude} °, Longitude: ${longitude} °`);
    socket.emit("sendGeoLocation", linkOnMap);
  };

  const error = () => console.log("Unable to retrieve your location");

  if (!navigator.geolocation) {
    return console.log("Geolocation is not supported by your browser");
  }

  navigator.geolocation.getCurrentPosition(success, error);
});

// const increment = document.querySelector("#increment");
// let count = 0;
// increment.addEventListener("click", () => {
//   socket.emit("increment", count);
// });

// socket.on("countUpdated", (count) => {
//   console.log("The count is updated", count);
// });

socket.on("sendGeoLocation", (link) => {
  root.insertAdjacentHTML("afterbegin", `<a href=${link}>Show in Map</a>`);
});
