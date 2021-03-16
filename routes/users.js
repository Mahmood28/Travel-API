const express = require("express");
const router = express.Router();

const passport = require("passport");
const {
  signup,
  signin,
  myprofile,
  fetchUser,
  Updateprofile,
  orderHistory,
} = require("../controllers/userControllers");
const upload = require("../middleware/multer");

//router param not being used --> remove it
router.param("userId", async (req, res, next, userId) => {
  const foundUser = await fetchUser(userId, next);
  if (foundUser) {
    req.user = foundUser;
    next();
  } else {
    next({
      status: 404,
      message: "User Not Found",
    });
  }
});

router.post("/signup", upload.single("picture"), signup);
router.post(
  "/signin",
  passport.authenticate("user", { session: false }),
  signin
);
//'profile' better naming
router.get(
  "/myprofile",
  passport.authenticate("jwt-user", { session: false }),
  myprofile
);
//'profile/update' better naming
router.put(
  "/Updateprofile",
  passport.authenticate("jwt-user", { session: false }),
  upload.single("picture"),
  Updateprofile
);
// 'orders-history' or 'orders' better naming
router.get(
  "/history",
  passport.authenticate("jwt-user", { session: false }),
  orderHistory
);

module.exports = router;
