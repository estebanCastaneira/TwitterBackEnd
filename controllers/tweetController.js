const Tweet = require("../models/Tweet");

// Display a listing of the resource.
async function index(req, res) {}

async function likes(req, res) {
  const userLike = await Tweet.findOne({
    _id: req.params.tweetId,
    likes: req.user.id,
  });

  if (userLike === null) {
    const likes = await Tweet.findByIdAndUpdate(req.params.tweetId, {
      $push: { likes: req.user.id },
    }).populate("likes");

    res.redirect("back");
  } else {
    const likes = await Tweet.findByIdAndUpdate(req.params.tweetId, {
      $pull: { likes: req.user.id },
    }).populate("likes");

    res.redirect("back");
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
    await Tweet.create({
      content: content,
      author: req.user,
    });
    res.redirect("back");
  } catch (error) {
    console.log(error);
  }
}

// Show the form for editing the specified resource.
async function edit(req, res) {}

// Update the specified resource in storage.
async function update(req, res) {}

// Remove the specified resource from storage.
async function destroy(req, res) {
  try {
    await Tweet.findByIdAndDelete(req.params.id);
    res.redirect(req.get("referer"));
  } catch (error) {
    console.log(error);
  }
}

// Otros handlers...

module.exports = {
  store,
  destroy,
  index,
  likes,
};
