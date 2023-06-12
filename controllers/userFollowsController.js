const User = require("../models/User");
const _ = require("lodash");

// ============ VISTA FOLLOWING ====================
async function indexFollowing(req, res) {
  const username = req.params.username;
  const user = await User.findOne({ username: username }).populate("following");
  return res.json(user);
}

async function indexFollowers(req, res) {
  const username = req.params.username;
  const user = await User.findOne({ username: username }).populate("followers");
  return res.json(user);
}

async function follow(req, res) {
  const userIdToFollow = req.params.userIdToFollow;

  // follow a Follower:
  await User.findByIdAndUpdate(req.auth.user.id, { $push: { following: userIdToFollow } });
  //agregamos el User como Follower
  await User.findByIdAndUpdate(userIdToFollow, { $push: { followers: req.auth.user.id } });
  res.json("Follow realizado");
}

async function unFollow(req, res) {
  const userIdToUnFollow = req.params.userIdToUnFollow;

  await User.findByIdAndUpdate(req.auth.user.id, { $pull: { following: userIdToUnFollow } });
  await User.findByIdAndUpdate(userIdToUnFollow, { $pull: { followers: req.auth.user.id } });
  res.json("UnFollow realizado");
}
// ============ VISTA FOLLOWERS ====================

module.exports = {
  indexFollowing,
  indexFollowers,
  follow,
  unFollow,
};
