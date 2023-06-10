const express = require("express");
const router = express.Router();
const userFollowsController = require("../controllers/userFollowsController");
const { expressjwt: checkJwt } = require("express-jwt");

router.use(checkJwt({ secret: process.env.JWT_SECRET_STRING, algorithms: ["HS256"] }));
router.get("/following/:username", userFollowsController.indexFollowing);
router.get("/followers/:username", userFollowsController.indexFollowers);
router.patch("/follow/:userIdToFollow", userFollowsController.follow);
router.patch("/unfollow/:userIdToUnFollow", userFollowsController.unFollow);

module.exports = router;
