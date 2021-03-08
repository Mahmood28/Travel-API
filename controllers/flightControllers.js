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

exports.flightList = async (req, res, next) => {
  try {
    const flights = await Flight.findAll();
    res.json(flights);
  } catch (error) {
    next(error);
  }
};
