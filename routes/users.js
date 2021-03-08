const express = require('express');
const router = express.Router();
const passport = require('passport');
const { signup, signin } = require('../controllers/userControllers');
const upload = require('../middleware/multer');
router.post('/signup', upload.single('picture'), signup);
router.post(
	'/signin',
	passport.authenticate('local', { session: false }),
	signin
);
module.exports = router;
