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
          model: Airline,
          as: "airlines",
          attributes: ["id"],
        },
        {
          model: Destination,
          as: "destination",
          attributes: ["airport"],
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
          attributes: ["code"],
        },
        {
          model: Destination,
          as: "origin",
          attributes: ["code"],
        },
      ],
    });
    res.json(foundFlights);
  } catch (error) {
    next(error);
  }
};
