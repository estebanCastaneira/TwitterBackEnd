const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const { verifyToken } = require("../middlewares/verifyToken");

router.use(verifyToken);

router.get("/:username", userController.show);
router.post("/", userController.store);

module.exports = router;
