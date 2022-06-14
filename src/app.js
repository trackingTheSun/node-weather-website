const path = require("path");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");
const express = require("express");
const hbs = require("hbs");

// console.log(__dirname);
// console.log(__filename);
// console.log(path.join(__dirname, "../public"));
// console.log(process.argv[2]);

const app = express();

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// using handle bars as a template engine to render dynamic web pages and setup views location
app.set("view engine", "hbs"); // setting up hbs
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  // render allows us render one of our views
  res.render("index", {
    title: "The Weather_App",
    name: "Kabs Khunou",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
    name: "Kabs Khunou",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help page",
    name: "Kabs Khunou",
    message: "for more help please visit the home-page",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address)
    return res.send({ error: "You need to provide and address!" });

  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      try {
        if (error) {
          return res.send({ error });
          // res.send({ error: error });
        }

        forecast(latitude, longitude, (error, data) => {
          if (error) {
            return res.send({ error });
            // res.send({ error: error });
          }

          res.send({
            forecast: data,
            location,
            address: req.query.address,
          });
        });
      } catch (error) {
        console.log(error);
      }
    }
  );
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    console.log("You must provide a search term");

    return res.send({
      error: "You must provide a search term",
    });
  }

  console.log(req.query.search);
  res.send({
    products: [],
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "Help 404 Page",
    name: "Kabs Khunou",
    message: "Help article not found",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404 Page",
    name: "Kabs Khunou",
    message: "Page not found",
  });
});

app.listen(3000, () => {
  console.log("Server is up on port 3000.");
});
