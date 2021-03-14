const { Op } = require("sequelize");
const { Booking, TravelClassCapacity } = require("../db/models");

exports.bookingCreate = async (req, res, next) => {
  try {
    const { flights, passangers, travelClassId } = req.body;
    const newBookings = await Booking.bulkCreate(passangers);
    newBookings.forEach(async (booking) => await booking.addFlights(flights));
    const foundFlights = await TravelClassCapacity.findAll({
      where: {
        flightId: {
          [Op.or]: flights,
        },
        travelClassId,
      },
    });
    foundFlights.forEach(
      async (flight) =>
        await flight.update({
          ...flight,
          vacancy: flight.vacancy - passangers.length,
        })
    );
    res.status(201).json(newBookings.map((booking) => ({ booking, flights })));
  } catch (error) {
    next(error);
  }
};

exports.bookingList = async (req, res, next) => {
  try {
    const booking = await Booking.findAll();
    res.json(booking);
  } catch (error) {
    next(error);
  }
};
