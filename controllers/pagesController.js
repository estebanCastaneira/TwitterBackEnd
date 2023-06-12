const User = require("../models/User");
const Tweet = require("../models/Tweet");
const { formatDistanceToNow, format, isSameDay } = require("date-fns");
const { en } = require("date-fns/locale");

async function showHome(req, res, next) {
  try {
    const tweets = [];
    const following = req.user.following;
    for (const followingId of following) {
      const followingTweets = await Tweet.find({ author: followingId })
        .populate("author")
        .limit(20);
      tweets.push(...followingTweets);
    }
    res.render("pages/home", {
      isSameDay,
      formatDistanceToNow,
      format,
      en,
      tweets,
    });
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  showHome,
  showContact,
  showAboutUs,
};
