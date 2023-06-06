const User = require("../models/User");
const Tweet = require("../models/Tweet");
const _ = require("lodash");

// ============ VISTA FOLLOWING ====================
async function indexFollowing(req, res) {
  const user = await User.findOne({ username: req.params.username }).populate("following");
  res.render("pages/following", { user });
}

async function indexFollowers(req, res) {
  const user = await User.findOne({ username: req.params.username }).populate("followers");
  res.render("pages/followers", { user });
}

async function followFollower(req, res) {
  const followerId = req.params.followerId;
  // follow a Follower:
  await User.findByIdAndUpdate(req.user.id, { $push: { following: followerId } });
  //agregamos el User como Follower
  await User.findByIdAndUpdate(followerId, { $push: { followers: req.user.id } });
  res.redirect(req.get("referer"));
}

async function unFollow(req, res) {
  const followId = req.params.followId;

  await User.findByIdAndUpdate(req.user.id, { $pull: { following: followId } });
  await User.findByIdAndUpdate(followId, { $pull: { followers: req.user.id } });
  res.redirect(req.get("referer"));
}
// ============ VISTA FOLLOWERS ====================

module.exports = {
  indexFollowing,
  indexFollowers,
  followFollower,
  unFollow,
};
