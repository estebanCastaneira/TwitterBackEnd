const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const tweetController = require("../controllers/tweetController");

router.get("/:username", userController.showProfile);
// router.get("/:username", userController.index);
router.post("/tweet/:tweetId/like", tweetController.likes);
// router.get("/crear", userController.create);
// router.get("/:id", userController.show);
// router.post("/", userController.store);
// router.get("/editar/:id", userController.edit);
// router.patch("/:id", userController.update);
// router.delete("/:id", userController.destroy);

module.exports = router;
