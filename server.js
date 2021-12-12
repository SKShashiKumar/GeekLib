require("dotenv").config();

// import express as express
const express = require("express");

// path lib added
const path = require("path");

// mongoose for db
const db = require("mongoose");

const geekRoutes = require("./Routes/geekRoutes");

// setting up the port environment or default at 8002
const port = process.env.PORT || 8002;

// Server creation using express()
const app = express();

// Mongodb Url
const dbUrl = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ysa7a.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

// Connect with DB
db.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => {
    app.listen(port);
    console.log(`Server running`);
  })
  .catch((err) => console.log(err));

// json parser (body-parser)
app.use(express.urlencoded({ extended: true }));

// set Public folder as static
app.use(express.static(path.join(__dirname, "Public")));

// set the view engine to ejs
// set views as public for absolute path
app.set("views", path.join(__dirname, "/Views"));

// set up ejs as view engine
app.set("view engine", "ejs");

// Setting the views folder
app.set("Views", path.join(__dirname, "Views"));

// Routes
app.use(geekRoutes);

// default route not-match condition it at last
app.use((req, res) => {
  res.send("<h1>404 Page not found</h1>");
});
