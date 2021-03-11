const bcrypt = require("bcrypt");
const upload = require("../middleware/multer");
const jwt = require("jsonwebtoken");
//models
const { Airline, Flight } = require("../db/models");
//keys
const { JWT_SECRET, JWT_EXPIRATION_MS } = require("../config/keys");

exports.signup = async (req, res, next) => {
  const { password } = req.body;
  const saltRounds = 10;
  try {
    console.log(req.body);
    if (req.file) {
      req.body.picture = `http://${req.get("host")}/media/${req.file.filename}`;
    }
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    req.body.password = hashedPassword;
    const newAirline = await Airline.create(req.body);
    const payload = {
      id: newAirline.id,
      nameOfAirline: newAirline.nameOfAirline,
      username: newAirline.username,
      email: newAirline.email,
      exp: Date.now() + JWT_EXPIRATION_MS,
    };
    const token = jwt.sign(JSON.stringify(payload), JWT_SECRET);
    res.status(201).json({ token });
  } catch (error) {
    next(error);
  }
};

exports.signin = (req, res) => {
  const { user } = req;
  const payload = {
    id: user.id,
    username: user.username,
    exp: Date.now() + parseInt(JWT_EXPIRATION_MS),
  };

  const token = jwt.sign(JSON.stringify(payload), JWT_SECRET);
  res.json({ token });
};

exports.fetchAirline = async (airlineId, next) => {
  try {
    const foundAirline = await Airline.findByPk(airlineId);
    return foundAirline;
  } catch (error) {
    next(error);
  }
};

exports.airlineList = async (req, res, next) => {
  try {
    const airlines = await Airline.findAll({
      include: {
        model: Flight,
        as: "flights",
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      },
    });

    res.json(airlines);
  } catch (error) {
    next(error);
  }
};

exports.airlineDetail = async (req, res, next) => {
  res.json(req.airline);
};

exports.flightCreate = async (req, res, next) => {
  try {
    const {
      arrivalAirport,
      departureAirport,
      departureTime,
      arrivalTime,
    } = req.body;
    req.body.airlineId = req.airline.id;

    // console.log(req.body);
    const newFlight = await Flight.bulkCreate([
      req.body,
      {
        ...req.body,
        name: req.body.name + 1324,
        arrivalAirport: departureAirport,
        departureAirport: arrivalAirport,
        departureTime: +arrivalTime + 0.5,
        arrivalTime: 2 * +arrivalTime - +departureTime + 0.5,
      },
    ]);
    res.status(201).json(newFlight);
  } catch (error) {
    console.log(error);

    next(error);
  }
};

exports.flightUpdate = async (req, res) => {
  const { flightId } = req.params;
  try {
    const foundFlight = await Flight.findByPk(flightId);
    if (foundFlight) {
      await foundFlight.update(req.body);

      res.status(204).end();
    } else {
      res.status(404).json({ message: "Sorry Flight Not Found!" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
