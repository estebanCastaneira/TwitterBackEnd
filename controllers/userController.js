const formidable = require("formidable");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const { formatDistanceToNow, format, isSameDay } = require("date-fns");
const { en } = require("date-fns/locale");
const Tweet = require("../models/Tweet");

async function show(req, res) {
  const username = req.params.username;
  const user = await User.findOne({ username: username }).populate("tweets");
  console.log(username);
  return res.json(user);
}

// Display a listing of the resource.
async function showProfile(req, res) {
  try {
    const user = await User.find({ username: req.params.username });
    const tweets = await Tweet.find({ author: user }).populate("author");
    res.render("pages/profile", {
      isSameDay,
      formatDistanceToNow,
      format,
      en,
      tweets,
    });
  } catch (error) {
    console.log(error);
  }
}

// Show the form for creating a new resource
async function createUser(req, res) {
  const form = formidable({
    multiples: true,
    uploadDir: __dirname + "/../public/img/avatars",
    keepExtensions: true,
  });

  form.parse(req, async (err, fields, files) => {
    const users = await User.find();
    const unavalilableUser = users.some((u) => {
      return u.username === fields.username || u.email === fields.email;
    });
    if (unavalilableUser) {
      req.json("Este usuario ya existe");
    } else {
      const {
        firstname: firstname,
        lastname: lastname,
        username: username,
        email: email,
        password: password,
      } = fields;

      const newUser = new User({
        firstname: firstname,
        lastname: lastname,
        username: username,
        email: email,
        password: await bcrypt.hash(password, 10),
        bio: "",
        avatar: "img/avatars/" + files.avatar.newFilename,
        tweets: [],
        following: [],
        followers: [],
      });

      await newUser.save();

      res.json(newUser);
    }
  });
}

// Store a newly created resource in storage.
async function store(req, res) {}

// Show the form for editing the specified resource.
async function edit(req, res) {}

// Update the specified resource in storage.
async function update(req, res) {}

// Remove the specified resource from storage.
async function destroy(req, res) {}

// Otros handlers...
// ...

module.exports = {
  show,
  showProfile,
  createUser,
};
