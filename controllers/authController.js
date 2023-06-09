const bcrypt = require("bcryptjs");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
require("dotenv").config();

async function token(req, res, next) {
  try {
    const user = await User.findOne({
      $or: [{ email: req.body.identifier }, { username: req.body.identifier }],
    });
    if (!user) {
      return res.json("credenciales inválidas");
    }
    const match = await bcrypt.compare(req.body.password, user.password);
    if (!match) {
      return res.json("credenciales inválidas");
    }
    const token = jwt.sign({ user }, process.env.JWT_SECRET_STRING);
    return res.json({ ...user, token });
  } catch (error) {
    return next(error);
  }
}
module.exports = {
  token,
};
