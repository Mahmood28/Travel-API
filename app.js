const db = require("./db/models");
const express = require("express");
const cors = require("cors");
const path = require("path");
const userRoutes = require("./routes/users");
const airlinesRoutes = require("./routes/airlines");
const flightRoutes = require("./routes/flights");
const destinationRoutes = require("./routes/destinations");
const bookingRoutes = require("./routes/booking");
const passport = require("passport");
require("./middleware/passport")(passport);

const app = express();

//Middleware
app.use(express.json());
app.use(cors());
app.use(passport.initialize());

app.use("/flights", flightRoutes);
app.use("/booking", bookingRoutes);
app.use("/airlines", airlinesRoutes);
app.use("/destinations", destinationRoutes);
app.use("/user", userRoutes);

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
//db.sequelize.sync({ force: true });

app.listen(8000);
