const Tweet = require("../models/Tweet");
const User = require("../models/User");

async function index(req, res, next) {
  try {
    const loggedUser = await User.findById(req.auth.user.id);
    const tweets = await Tweet.find({
      $or: [{ author: { $in: loggedUser.following } }, { author: loggedUser }],
    }).populate("author", "-password");
    return res.json(tweets);
  } catch {
    return next(error);
  } //TODO - ordenar fecha
}

async function likes(req, res, next) {
  try {
    const tweet = await Tweet.findById(req.params.id);

    if (!tweet.likes.includes(req.auth.user.id)) {
      const likeList = await Tweet.findByIdAndUpdate(req.params.id, {
        $push: { likes: req.auth.user.id },
      }).populate("likes");
      return res.json({ message: "Like :D", likes: likeList.likes });
    } else {
      const likeList = await Tweet.findByIdAndUpdate(req.params.id, {
        $pull: { likes: req.auth.user.id },
      }).populate("likes");
      return res.json({ message: "Dislike :(", likes: likeList.likes });
    }
  } catch (error) {
    return next(error);
  }
}

// Store a newly created resource in storage.
async function store(req, res, next) {
  try {
    const content = req.body.content;
    const newTweet = await Tweet.create({
      content: content,
      author: req.auth.user.id,
    });
    const user = await User.findById(req.auth.user.id);
    user.tweets.push(newTweet.id);
    user.save();
    const tweet = await Tweet.findById(newTweet.id).populate("author");
    res.json(tweet);
  } catch (error) {
    return next(error);
  }
}

// Remove the specified resource from storage.
async function destroy(req, res, next) {
  try {
    const response = await Tweet.findByIdAndDelete(req.params.id);
    const user = await User.findById(req.auth.user.id);
    user.tweets = user.tweets.filter((tweet) => tweet._id != req.params.id);
    user.save();
    res.json(response);
  } catch (error) {
    return next(error);
  }
}

// Otros handlers...

module.exports = {
  index,
  store,
  likes,
  destroy,
};
