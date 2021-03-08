//imports
const db = require("./db/models");
const express = require("express");
const cors = require("cors");
const path = require("path");
const flightRoutes = require("./routes/flights");

const app = express();

//Middleware
app.use(cors());
app.use(express.json());
app.use("/flights", flightRoutes);
app.use("/media", express.static(path.join(__dirname, "media")));

app.use((req, res, next) => {
  const error = {
    status: 404,
    message: "Path Not Found!",
  };
  next(error);
});

app.use((err, req, res, next) => {
  res
    .status(err.status || 500)
    .json({ message: err.message || "Internal Server Error" });
});

db.sequelize.sync();
// db.sequelize.sync({ alter: true });
// db.sequelize.sync({ force: true });
app.listen(8000);

//yarn add express cors sequelize sequelize-cli pg pg-hstore multer
