const { User, Booking, Flight } = require('../db/models');
const bcrypt = require('bcrypt');
const upload = require('../middleware/multer');
const jwt = require('jsonwebtoken');
const { JWT_SECRET, JWT_EXPIRATION_MS } = require('../config/keys');

exports.fetchUser = async (userId, next) => {
  try {
    const foundUser = await User.findByPk(userId);
    return foundUser;
  } catch (error) {
    next(error);
  }
};
exports.signup = async (req, res, next) => {
  const { password } = req.body;
  const saltRounds = 10;
  try {
    if (req.file) {
      req.body.picture = `http://${req.get("host")}/media/${req.file.filename}`;
    }
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    req.body.password = hashedPassword;
    const newUser = await User.create(req.body);
    const payload = {
      id: newUser.id,
      username: newUser.username,
      email: newUser.email,
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      isAirline: false,
      exp: Date.now() + JWT_EXPIRATION_MS,
    };
    const token = jwt.sign(JSON.stringify(payload), JWT_SECRET);
    res.status(201).json({ token });
  } catch (error) {
    next(error);
  }
};

exports.signin = (req, res) => {
  const { user } = req;
  const payload = {
    id: user.id,
    username: user.username,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    isAirline: false,
    exp: Date.now() + parseInt(JWT_EXPIRATION_MS),
  };
  const token = jwt.sign(JSON.stringify(payload), JWT_SECRET);
  res.json({ token });
};

exports.myprofile = async (req, res) => {
  try {
    res.status(200).json(req.user);
  } catch (error) {
    next(error);
  }
};

exports.Updateprofile = async (req, res) => {
  if (req.file) {
    req.body.picture = `http://${req.get("host")}/media/${req.file.filename}`;
  }
  await req.user.update(req.body);
  res.json(req.user);
};

// exports.orderHistory = async (req, res, next) => {
// 	try {
// 		const userId = req.user.id;
// 		const passengers = await Booking.findAll({
// 			where: {
// 				userId,
// 			},
// 			include: [
// 				{
// 					model: Flight,
// 				},
// 			],
// 		});
// 		const bookId = passengers.map((foundBook) => foundBook.id);
// 		const flightsID = await BookingFlight.findAll({
// 			where: {
// 				bookId,
// 			},
// 		});
// 		const id = flightsID.map((foundBook) => foundBook.flightId);
// 		const flights = await Flight.findAll({
// 			where: {
// 				id,
// 			},
// 			include: [
// 				{
// 					model: Booking,
// 				},
// 			],
// 		});

// 		res.status(200).json(flights);
// 	} catch (error) {
// 		next(error);
// 	}
// };
