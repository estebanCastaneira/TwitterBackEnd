const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
require("dotenv").config();

router.post("/token", authController.token);

module.exports = router;
