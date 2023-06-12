const formidable = require("formidable");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const { formatDistanceToNow, format, isSameDay } = require("date-fns");
const { en } = require("date-fns/locale");
const Tweet = require("../models/Tweet");
const tryCatchHandler = require("../middlewares/tryCatchHandler");

async function show(req, res, next) {
  try {
    const username = req.params.username;
    const user = await User.findOne({ username: username }).populate("tweets");
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

async function createUser(req, res, next) {
  try {
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
        res.json("Este usuario ya existe");
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
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  show,
  store,
};
