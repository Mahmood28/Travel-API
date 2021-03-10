const express = require('express');
const router = express.Router();

const passport = require('passport');
const {
	signup,
	signin,
	myprofile,
	fetchUser,
	Updateprofile,
} = require('../controllers/userControllers');
const upload = require('../middleware/multer');

router.param('userId', async (req, res, next, userId) => {
	const foundUser = await fetchUser(userId, next);
	if (foundUser) {
		req.user = foundUser;
		next();
	} else {
		next({
			status: 404,
			message: 'User Not Found',
		});
	}
});

router.post('/signup', upload.single('picture'), signup);
router.post(
	'/signin',
	passport.authenticate('user', { session: false }),
	signin
);
router.get('/:userId', myprofile);
router.put('/:userId', upload.single('picture'), Updateprofile);

module.exports = router;
