const express = require("express");
const router = express.Router();
const userFollowsController = require("../controllers/userFollowsController");
const { verifyToken } = require("../middlewares/verifyToken");

router.use(verifyToken);
router.get("/following/:username", userFollowsController.indexFollowing);
router.get("/followers/:username", userFollowsController.indexFollowers);
router.patch("/follow/:userIdToFollow", userFollowsController.follow);
router.patch("/unfollow/:userIdToUnFollow", userFollowsController.unFollow);

module.exports = router;
