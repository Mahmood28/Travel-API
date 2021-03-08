const { Flight, Airline } = require("../db/models");

exports.flightList = async (req, res, next) => {
  try {
    const flights = await Flight.findAll({
      include: {
        model: Airline,
        as: "airlines",
        // attributes: ["id"],
      },
    });

    res.json(flights);
  } catch (error) {
    next(error);
  }
};
