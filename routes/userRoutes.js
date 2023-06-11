const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const tweetController = require("../controllers/tweetController");
const { verifyToken } = require("../middlewares/verifyToken");

router.get("/:username", verifyToken, userController.show);

router.post("/", userController.createUser);

// router.get("/:username", userController.showProfile);
// // router.get("/:username", userController.index);
// router.post("/tweet/:tweetId/like", tweetController.likes);
// router.get("/:id", userController.show);
// router.post("/", userController.store);
// router.get("/editar/:id", userController.edit);
// router.patch("/:id", userController.update);
// router.delete("/:id", userController.destroy);

module.exports = router;
