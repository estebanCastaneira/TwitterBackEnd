const passport = require("passport");
const bcrypt = require("bcryptjs");
const formidable = require("formidable");
const User = require("../models/User");

async function login(req, res) {
  res.render("pages/login");
}

async function loginPassport(req, res) {
  passport.authenticate("local", {
    successRedirect: req.session.redirectTo ? req.session.redirectTo : "/",
    failureRedirect: "/login",
    failureFlash: {
      type: "failureFalsh",
      menssage: "Incorrect user or password",
    },
    successFlash: {
      type: "successFlash",
      menssage: "Successfully validated credentials",
    },
  })(req, res);
}

async function register(req, res) {
  res.render("pages/register");
}

async function createUser(req, res) {
  const form = formidable({
    multiples: true,
    uploadDir: __dirname + "/../public/img/avatars",
    keepExtensions: true,
  });

  form.parse(req, async (err, fields, files) => {
    const users = await User.find();
    const unavalilableUser = users.some((u) => {
      u.username === fields.username || u.email === fields.email;
    });
    if (unavalilableUser) {
      req.flash("Este usuario ya existe");
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
        avatar: "img/avatars/" + files["avatar"].newFilename,
        tweets: [],
        following: [],
        followers: [],
      });

      newUser.save();

      if (newUser) {
        req.login(newUser, () => res.redirect("/"));
      } else {
        res.redirect("back");
      }
    }
  });
}

async function logout(req, res) {
  // req.logout(function (err) {
  //   if (err) {
  //     return next(err);
  //   }
  //   res.redirect("/");
  // });
  req.session.destroy(function (err) {
    res.redirect("/");
  });

  console.log("bienvenido");
}
module.exports = {
  login,
  loginPassport,
  register,
  createUser,
  logout,
};
