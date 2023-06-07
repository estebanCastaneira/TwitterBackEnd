const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const { expressjwt: checkJwt } = require("express-jwt");
require("dotenv").config();

/**
 * Se sugiere usar este archivo para crear rutas relativas al proceso de
 * autenticación. Ejemplos: "/login" y "/logout".
 */
router.post("/token", authController.token);
router.get(
  "/users/profile",
  checkJwt({ secret: process.env.JWT_SECRET_STRING, algorithms: ["HS256"] }),
  authController.show,
);

// router.get("/register", authController.register);
// router.post("/register", authController.createUser);

// router.get("/logout", authController.logout);

module.exports = router;
