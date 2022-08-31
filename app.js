const path = require("path");
const express = require("express");
const port = process.env.PORT || 3000;
const app = express();
const hbs = require("hbs");
const cors = require("cors");

// Define paths for Express config
const publicDirectory = path.join(__dirname, "./public");
const viewsPath = path.join(__dirname, "./templates/views");
const partialsPath = path.join(__dirname, "./templates/partials");
const getWeatherForcast = require("./src/utils/getWeatherForcast.js");

// Setup handlebars ebgube abd vuews location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectory));
app.use(cors());

// Render the view template
app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Ammar Sayed",
  });
});

app.get("/weather", (req, res) => {
  const { lat = null, long = null, q = "" } = req.query;
  if ((!lat || !long) && !q)
    return res.send({ error: "please provide latitude, longitude values" });

  getWeatherForcast(lat, long, q, (err, forcastData) => {
    if (err) return res.send({ error: err });

    res.send({
      weather: forcastData?.weather[0]?.description,
      allData: forcastData,
    });
  });
});

/*
app.get("/products", (req, res) => {
  // destructure with default values
  const { search = null, rating = null } = req.query;

  if (!search) return res.send("please provide search value");

  res.send({ products: [] });
});
*/

app.get("/about", (req, res) =>
  res.render("about", {
    title: "About Me",
    name: "Ammar Sayed",
  })
);

app.get("/help", (req, res) =>
  res.render("help", {
    title: "Help Page",
    message: "This is the Help message ! 🤓",
  })
);

//
app.get("/help/*", (req, res) =>
  res.render("not-found", {
    title: "404",
    message: "This Articel is not found ! 🤓",
  })
);

// Default route must come as last page
app.get("*", (req, res) =>
  res.render("not-found", {
    title: "404",
    message: "Page not found ! 🤓",
  })
);

app.listen(port, () => {
  console.log(`🚀 Server is runing on port 🚀  ${port}`);
});
