const express = require("express");
const router = express.Router();
const {
  flightList,
  flightSearch,
} = require("../controllers/flightControllers");

router.get("/", flightList);

router.post("/search", flightSearch);

module.exports = router;
