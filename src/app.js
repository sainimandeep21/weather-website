const path = require("path");
const express = require("express");
console.log(path.join(__dirname, "../public"));
const app = express();
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

//defining paths for express configuration
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

//defining paths for handlebars
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

//setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("/", (req, res) => {
  res.render("index", {
    title: "weather app",
    name: "mandeep",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "about the page",
    name: "mandy",
  });
});
app.get("/help", (req, res) => {
  res.render("help", {
    help: "please help me",
    title: "HELP",
    name: "mandee saini",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "you provide address for weather forecast",
    });
  }
  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({ error });
      }
      forecast(latitude, longitude, (error, forecastData) => {
        if (error) {
          return res.send({ error });
        }
        res.send({
          forecast: forecastData,
          location,
          address: req.query.address,
        });
      });
    }
  );
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "you must provide search query",
    });
  }
  console.log(req.query.search);
  res.send({
    products: [],
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404 help",
    name: "mandeep saini",
    errormessage: "this help article is not found",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404 page",
    name: "mandeep",
    errormessage: "this page is not found",
  });
});

app.listen(3000, () => {
  console.log("the server is running on port 3000");
});
