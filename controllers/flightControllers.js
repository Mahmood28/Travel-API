const {
  Flight,
  Destination,
  TravelClassCapacity,
  Airline,
} = require("../db/models");
const { Op } = require("sequelize");

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
    const destination = await Destination.findOne({
      where: {
        airport: arrivalAirport,
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
          [Op.gt]: passangers - 1,
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
