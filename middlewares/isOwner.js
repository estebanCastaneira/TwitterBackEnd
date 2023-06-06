const Tweet = require("../models/Tweet");

async function isOwner(req, res, next) {
  const tweet = await Tweet.findById(req.params.id);

  tweet.author.toString() === req.user.id ? next() : req.redirect("back");
}

module.exports = isOwner;
