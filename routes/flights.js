const express = require("express");
const router = express.Router();
const {
  flightList,
  flightDetail,
  flightUpdate,
  flightSearch,
} = require("../controllers/flightControllers");
//remove flightUpdate -> not used
router.get("/", flightList);

router.get("/:flightId", flightDetail);

router.post("/search", flightSearch);

module.exports = router;
