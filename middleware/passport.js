const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const { User } = require('../db/models');

exports.localStrategy = new LocalStrategy(async (username, password, done) => {
	try {
		const user = await User.findOne({
			where: {
				username,
			},
		});
		let passwordsMatch = user
			? await bcrypt.compare(password, user.password)
			: false;
		return done(null, passwordsMatch ? user : false);
	} catch (error) {
		return done(error);
	}
});
