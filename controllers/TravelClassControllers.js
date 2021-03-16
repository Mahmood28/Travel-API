const { TravelClass } = require("../db/models");

exports.travelClassList = async (req, res, next) => {
  try {
    res.json(await TravelClass.findAll({}));
  } catch (error) {
    next(error);
  }
};
