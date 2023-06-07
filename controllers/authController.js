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
