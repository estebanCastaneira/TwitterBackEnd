const express = require("express");
const router = express.Router();
const userFollowsController = require("../controllers/userFollowsController");

router.get("/:username/following", userFollowsController.indexFollowing);
router.get("/:username/followers", userFollowsController.indexFollowers);

router.patch("/followFollower/:followerId", userFollowsController.followFollower);

router.patch("/unfollow/:followId", userFollowsController.unFollow);

module.exports = router;
