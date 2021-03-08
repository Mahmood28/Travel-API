const { Flight } = require("../db/models");

exports.flightCreate = async (req, res, next) => {
  try {
    console.log(req.body);
    const newFlight = await Flight.create(req.body);
    res.status(201).json(newFlight);
  } catch (error) {
    next(error);
  }
};
