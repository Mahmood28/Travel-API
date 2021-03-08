const express = require("express");
const router = express.Router();
const {
  flightCreate,
  flightList,
  flightSearch,
} = require("../controllers/flightControllers");

router.post("/", flightCreate);

router.get("/", flightList);

router.get("/search", flightSearch);

module.exports = router;
