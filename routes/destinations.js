const express = require("express");
const router = express.Router();
const { destinationList } = require("../controllers/destinationControllers");

router.get("/", destinationList);

module.exports = router;
