const Tweet = require("../models/Tweet");
const User = require("../models/User");

// Display a listing of the resource.
async function index(req, res) {
  try{
  const loggedUser = await User.findById(req.auth.user.id);
  const tweets = await Tweet.find({
    $or: [{ author: { $in: loggedUser.following } }, { author: loggedUser }],
  }).populate("author").limit(20)
  return res.json(tweets);
 }catch{
  console.log(error);
 } //TODO - ordenar fecha
}

async function likes(req, res) {
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
}

// Display the specified resource.
async function show(req, res) {}

// Show the form for creating a new resource
async function create(req, res) {}

// Store a newly created resource in storage.
async function store(req, res) {
  try {
    const content = req.body.content;
    const newTweet = await Tweet.create({
      content: content,
      author: req.auth.user.id,
    });
    const user = await User.findById(req.auth.user.id);
    user.tweets.push(newTweet._id);
    user.save();
    const tweet = await Tweet.findById(newTweet._id).populate("author");
    res.json(tweet);
  } catch (error) {
    console.log(error);
  }
}

// Remove the specified resource from storage.
async function destroy(req, res) {
  try {
    const response = await Tweet.findByIdAndDelete(req.params.id);
    const user = await User.findById(req.auth.user.id);
    user.tweets = user.tweets.filter((tweet) => tweet._id != req.params.id);
    user.save();
    res.json(response)
  } catch (error) {
    console.log(error);
  }
}

// Otros handlers...

module.exports = {
  index,
  store,
  likes,
  destroy,
};
