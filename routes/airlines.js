const express = require("express");
const router = express.Router();
const passport = require("passport");
const {
  signup,
  signin,
  fetchAirline,
  airlineList,
  airlineDetail,
  flightCreate,
  flightUpdate,
} = require("../controllers/airlineControllers");
const upload = require("../middleware/multer");

router.param("airlineId", async (req, res, next, airlineId) => {
  const foundAirline = await fetchAirline(airlineId, next);
  if (foundAirline) {
    req.airline = foundAirline;
    next();
  } else {
    next({
      status: 404,
      message: "Airline Not Found",
    });
  }
});

router.post("/signup", upload.single("logo"), signup);

router.post(
  "/signin",
  passport.authenticate("airline", { session: false }),
  signin
);

router.get("/", airlineList);

router.get("/:airlineId", airlineDetail);

router.put(
  "/:airlineId/flights/:flightId",
  passport.authenticate("jwt-airline", { session: false }),
  flightUpdate
);

router.post(
  "/:airlineId/flights",
  passport.authenticate("jwt-airline", { session: false }),
  flightCreate
);

module.exports = router;
