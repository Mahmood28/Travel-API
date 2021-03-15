const express = require("express");
const router = express.Router();
const { travelClassList } = require("../controllers/travelClassControllers");

router.get("/", travelClassList);

module.exports = router;
