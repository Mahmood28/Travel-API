const express = require("express");
const router = express.Router();
const { flightList } = require("../controllers/flightControllers");

router.get("/", flightList);

module.exports = router;
