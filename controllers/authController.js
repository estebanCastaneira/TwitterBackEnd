const bcrypt = require("bcryptjs");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
require("dotenv").config();

async function token(req, res) {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.json("email inválido"); //TODO
  }
  const match = await bcrypt.compare(req.body.password, user.password);
  if (!match) {
    return res.json("password inválida"); //TODO
  }
  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET_STRING);
  return res.json({ token });
}

async function show(req, res) {
  console.log(req.auth);
  return res.json("Cómo acceder a al info del usuario que está logueado");
}

// async function createUser(req, res) {
//   const form = formidable({
//     multiples: true,
//     uploadDir: __dirname + "/../public/img/avatars",
//     keepExtensions: true,
//   });

//   form.parse(req, async (err, fields, files) => {
//     const users = await User.find();
//     const unavalilableUser = users.some((u) => {
//       u.username === fields.username || u.email === fields.email;
//     });
//     if (unavalilableUser) {
//       req.flash("Este usuario ya existe");
//     } else {
//       const {
//         firstname: firstname,
//         lastname: lastname,
//         username: username,
//         email: email,
//         password: password,
//       } = fields;

//       const newUser = new User({
//         firstname: firstname,
//         lastname: lastname,
//         username: username,
//         email: email,
//         password: await bcrypt.hash(password, 10),
//         bio: "",
//         avatar: "img/avatars/" + files["avatar"].newFilename,
//         tweets: [],
//         following: [],
//         followers: [],
//       });

//       newUser.save();

//       if (newUser) {
//         req.login(newUser, () => res.redirect("/"));
//       } else {
//         res.redirect("back");
//       }
//     }
//   });
// }

// async function logout(req, res) {
//   // req.logout(function (err) {
//   //   if (err) {
//   //     return next(err);
//   //   }
//   //   res.redirect("/");
//   // });
//   req.session.destroy(function (err) {
//     res.redirect("/");
//   });

//   console.log("bienvenido");
// }
module.exports = {
  token,
  show,
  // login,
  // loginPassport,
  // register,
  // createUser,
  // logout,
};
