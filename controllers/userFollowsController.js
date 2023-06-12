const User = require("../models/User");
const _ = require("lodash");

// ============ VISTA FOLLOWING ====================
async function indexFollowing(req, res) {
  try {
    const username = req.params.username;
    const user = await User.findOne({ username: username }).populate("following");
    return res.json(user);
  } catch (error) {
    return next(error);
  }
}

async function indexFollowers(req, res, next) {
  try {
    const username = req.params.username;
    const user = await User.findOne({ username: username }).populate("followers");
    if (!user) {
      const error = new Error();
      error.status = 404;
      error.inner = { message: "User not found" };
      return next(error);
    }
    return res.json(user);
  } catch (error) {
    return next(error);
  }
}

async function follow(req, res, next) {
  try {
    const userIdToFollow = req.params.userIdToFollow;

    // follow a Follower:
    await User.findByIdAndUpdate(req.auth.user.id, { $push: { following: userIdToFollow } });
    //agregamos el User como Follower
    await User.findByIdAndUpdate(userIdToFollow, { $push: { followers: req.auth.user.id } });

    if (!User) {
      const error = new Error();
      error.status = 404;
      error.inner = { message: "User not found" };
      return next(error);
    }

    res.json("Follow realizado");
  } catch (error) {
    return next(error);
  }
}

async function unFollow(req, res, next) {
  try {
    const userIdToUnFollow = req.params.userIdToUnFollow;

    await User.findByIdAndUpdate(req.auth.user.id, { $pull: { following: userIdToUnFollow } });
    await User.findByIdAndUpdate(userIdToUnFollow, { $pull: { followers: req.auth.user.id } });

    if (!user) {
      const error = new Error();
      error.status = 404;
      error.inner = { message: "User not found" };
      return next(error);
    }

    res.json("UnFollow realizado");
  } catch (error) {
    return next(error);
  }
}
// ============ VISTA FOLLOWERS ====================

module.exports = {
  indexFollowing,
  indexFollowers,
  follow,
  unFollow,
};
