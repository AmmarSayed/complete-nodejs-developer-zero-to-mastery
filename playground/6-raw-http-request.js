// request without axios or request library
const https = require("node:https");

const url =
  "https://api.openweathermap.org/data/2.5/weather?lat=30.0778&lon=31.2852&appid=5a4921f4c521136fc54942c96db8a51f";

const request = https.request(url, (res) => {
  let data = "";

  res.on("data", (chunk) => {
    data = data + chunk.toString();
  });

  res.on("end", () => {
    const body = JSON.parse(data);
    console.log(body);
  });
});

request.on("error", (e) => {
  console.error(e);
});

request.end();
