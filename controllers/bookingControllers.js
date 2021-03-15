const { Op } = require("sequelize");
const { Booking, TravelClassCapacity } = require("../db/models");
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey("API_KEY");

// const bookingConfirmation = async (user, passangers, foundClass) => {
//   const recepient = user ?? passangers[0];
//   let flight;
//   const msg = {
//     to: `${recepient.email}`,
//     from: "mahmoodalwatani@hotmail.com",
//     subject: `Booking confirmation for ${recepient.lastName}, ${recepient.firstName} on ${flight.departureDate}`,
//     text: `Dear ${recepient.firstName},
// 		Thank you for booking your trip with us! Your ${flight.name} flight from ${flight.origin.city} to ${flight.destination.city} will be on ${flight.departureDate} at ${flight.departureTime}.`,
//     html: `<p> Dear ${recepient.firstName},\n
// 	  Thank you for booking your trip with us! Your ${flight.name} flight from ${flight.origin.city} to ${flight.destination.city} will be on ${flight.departureDate} at ${flight.departureTime}..</p>`,
//   };
//   try {
//     await sgMail.send(msg);
//     console.log(msg);
//   } catch (error) {
//     next(error);
//   }
// };

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

// exports.bookingList = async (req, res, next) => {
//   try {
//     const booking = await Booking.findAll();
//     res.json(booking);
//   } catch (error) {
//     next(error);
//   }
// };
