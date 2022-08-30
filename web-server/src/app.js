const path = require("path");
const express = require("express");
const PORT = 3000;
const app = express();
const hbs = require("hbs");

// Define paths for Express config
const publicDirectory = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup handlebars ebgube abd vuews location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectory));

// Render the view template
app.get("", (req, res) =>
  res.render("index", {
    title: "Weather",
    name: "Ammar Sayed",
  })
);

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

app.listen(PORT, () => {
  console.log(`🚀 Server is runing on port 🚀  ${PORT}`);
});
