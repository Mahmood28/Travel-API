const { Booking } = require('../db/models');

exports.bookingCreate = async (req, res, next) => {
	try {
		const newBook = await Booking.bulkCreate(req.body);
		res.status(201).json(newBook);
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
