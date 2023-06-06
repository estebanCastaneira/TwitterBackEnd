const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
/**
 * Se sugiere usar este archivo para crear rutas relativas al proceso de
 * autenticación. Ejemplos: "/login" y "/logout".
 */
router.get("/register", authController.register);
router.post("/register", authController.createUser);

router.post("/login", authController.loginPassport);
router.get("/login", authController.login);

router.get("/logout", authController.logout);

module.exports = router;
