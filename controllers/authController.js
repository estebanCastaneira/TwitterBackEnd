const bcrypt = require("bcryptjs");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
require("dotenv").config();

async function token(req, res) {
  const user = await User.findOne({
    $or: [{ email: req.body.identifier }, { username: req.body.identifier }],
  });
  if (!user) {
    return res.json("email inválido"); //TODO
  }
  const match = await bcrypt.compare(req.body.password, user.password);
  if (!match) {
    return res.json("password inválida"); //TODO
  }
  const token = jwt.sign({ user }, process.env.JWT_SECRET_STRING);
  return res.json({...user, token });
}

// async function logout(req, res) {
//   // req.logout(function (err) {
//   //   if (err) {node
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
  // login,
  // loginPassport,
  // register,
  // createUser,
  // logout,
};
