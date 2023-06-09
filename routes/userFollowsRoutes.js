const express = require("express");
const router = express.Router();
const userFollowsController = require("../controllers/userFollowsController");
const { expressjwt: checkJwt } = require("express-jwt");

router.get(
  "/following/:username",
  checkJwt({ secret: process.env.JWT_SECRET_STRING, algorithms: ["HS256"] }),
  userFollowsController.indexFollowing,
);
router.get(
  "/followers/:username",
  checkJwt({ secret: process.env.JWT_SECRET_STRING, algorithms: ["HS256"] }),
  userFollowsController.indexFollowers,
);
router.patch(
  "/follow/:userIdToFollow",
  checkJwt({ secret: process.env.JWT_SECRET_STRING, algorithms: ["HS256"] }),
  userFollowsController.follow,
);
router.patch(
  "/unfollow/:userIdToUnFollow",
  checkJwt({ secret: process.env.JWT_SECRET_STRING, algorithms: ["HS256"] }),
  userFollowsController.unFollow,
);

module.exports = router;
