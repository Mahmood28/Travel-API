const express = require("express");
const router = express.Router();
const {
  flightList,
  flightDetail,
  flightSearch,
} = require("../controllers/flightControllers");

router.get("/", flightList);

router.get("/:fligthId", flightDetail);



router.get("/search", flightSearch);

module.exports = router;
