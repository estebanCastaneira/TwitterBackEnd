const { expressjwt: checkJwt } = require("express-jwt");

const verifyToken = checkJwt({ secret: process.env.JWT_SECRET_STRING, algorithms: ["HS256"] });

module.exports = {
  verifyToken,
};
