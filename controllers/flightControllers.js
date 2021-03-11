const { Op } = require("sequelize");
const {
  Flight,
  Destination,
  TravelClassCapacity,
  Airline,
} = require("../db/models");
exports.flightList = async (req, res, next) => {
  try {
    const flights = await Flight.findAll({
      include: [
        {
          model: Destination,
          as: "destination",
          attributes: ["airport", "code"],
        },
        {
          model: Destination,
          as: "origin",
          attributes: ["airport", "code"],
        },
      ],
    });

    res.json(flights);
  } catch (error) {
    next(error);
  }
};

exports.flightDetail = async (req, res, next) => {
  res.json(req.flight);
};

exports.flightSearch = async (req, res, next) => {
  try {
    const {
      arrivalAirport,
      departureAirport,
      departureDate,
      arrivalDate,
      passangers,
    } = req.body;
    const flightCapacity = await TravelClassCapacity.findAll({
      where: {
        vacancy: {
          [Op.gt]: passangers - 1,
        },
      },
    });
    const foundFlights = await Flight.findAll({
      where: {
        id: {
          [Op.or]: flightCapacity.map((flight) => flightId),
        },
        destinationId: arrivalAirport,
        originId: departureAirport,
        departureDate,
        arrivalDate,
      },
      include: [
        {
          model: Destination,
          as: "destination",
          attributes: ["airport", "code", "country", "city"],
        },
        {
          model: Destination,
          as: "origin",
          attributes: ["airport", "code", "country", "city"],
        },
        {
          model: Airline,
          as: "airlines",
          attributes: ["name", "logo"],
        },
      ],
    });
    res.json(foundFlights);
  } catch (error) {
    next(error);
  }
};
