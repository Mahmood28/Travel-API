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
    const now = new Date();
    const flightCapacity = await TravelClassCapacity.findAll({
      where: {
        vacancy: {
          [Op.gte]: passangers,
        },
      },
    });
    const flightIds = flightCapacity.map((flights) => flights.flightId);
    if (flightIds.length === 0) res.json([]);
    else {
      const foundFlights = await Flight.findAll({
        where: {
          id: {
            [Op.or]: flightIds,
          },
          destinationId: arrivalAirport,
          originId: departureAirport,
          departureDate,
          arrivalDate,
          [Op.or]: [
            {
              departureTime: {
                [Op.gte]: now.getHours() + now.getMinutes() / 60,
              },
            },
            {
              departureDate: {
                [Op.ne]: now.toISOString().slice(0, 10),
              },
            },
          ],
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
    }
  } catch (error) {
    next(error);
  }
};
