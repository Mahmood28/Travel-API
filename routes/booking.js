const express = require("express");
const router = express.Router();
const passport = require("passport");
const {
  bookingCreate,
  bookingList,
} = require("../controllers/bookingControllers");

router.post("/", bookingCreate);
router.get("/", bookingList);

module.exports = router;
