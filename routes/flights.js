const express = require("express");
const router = express.Router();
const { flightCreate } = require("../controllers/flightControllers");

router.post("/", flightCreate);

module.exports = router;
