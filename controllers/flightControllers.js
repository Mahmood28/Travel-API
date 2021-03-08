const { Flight, Destination, TravelClassCapacity } = require("../db/models");
const { Op } = require("sequelize");

exports.flightCreate = async (req, res, next) => {
  try {
    console.log(req.body);
    const newFlight = await Flight.create(req.body);
    res.status(201).json(newFlight);
  } catch (error) {
    next(error);
  }
};

exports.flightList = async (req, res, next) => {
  try {
    const flights = await Flight.findAll({
      include: {
        model: Destination,
        as: "destination",
        attributes: ["airport"],
      },
    });
    res.json(flights);
  } catch (error) {
    next(error);
  }
};

exports.flightSearch = async (req, res, next) => {
  try {
    const {
      destinationAirport,
      departureAirport,
      departureDate,
      arrivalDate,
      passangers,
    } = req.body;
    const destination = await Destination.findOne({
      where: {
        airport: destinationAirport,
      },
    });
    const flights = await Flight.findAll({
      where: {
        destinationId: destination.id,
        departureAirport,
        departureDate,
        arrivalDate,
      },
      include: {
        model: Destination,
        as: "destination",
        attributes: ["airport"],
      },
    });
    const flightCapacity = await TravelClassCapacity.findAll({
      where: {
        flightId: {
          [Op.or]: flights.map((flight) => flight.id),
        },
        vacancy: {
          [Op.gt]: passangers,
        },
      },
    });
    const foundFlights = flights.filter((flight) =>
      flightCapacity.some((capacity) => capacity.flightId === flight.id)
    );
    res.json(foundFlights);
  } catch (error) {
    next(error);
  }
};
