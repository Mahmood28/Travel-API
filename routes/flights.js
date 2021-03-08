const express = require("express");
const router = express.Router();
const {
  flightCreate,
  flightList,
} = require("../controllers/flightControllers");

router.post("/", flightCreate);

router.get("/", flightList);

module.exports = router;
