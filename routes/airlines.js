const express = require("express");
const router = express.Router();
const passport = require("passport");
const { signup, signin } = require("../controllers/airlineControllers");
const upload = require("../middleware/multer");

router.post("/AirlineSignup", upload.single("picture"), signup);
router.post(
  "/AirlineSignin",
  passport.authenticate("local", { session: false }),
  signin
);
module.exports = router;
