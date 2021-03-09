const { Destination } = require("../db/models");

exports.destinationList = async (req, res, next) => {
  try {
    res.json(await Destination.findAll({}));
  } catch (error) {
    next(error);
  }
};
