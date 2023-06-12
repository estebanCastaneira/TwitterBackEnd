const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middlewares/verifyToken");
const tweetController = require("../controllers/tweetController");
//const userController = require("../controllers/userController");

router.get("/", verifyToken, tweetController.index);
//router.get("/:id", userController.show);
router.post("/", verifyToken, tweetController.store);

router.delete("/:id", verifyToken, tweetController.destroy);

router.patch("/:id/like", verifyToken, tweetController.likes);
// router.patch("/:id/like",tweetController.disLikes);

// const controller = require("../controllers/tweetController");
// // router.get("/", tweetController.index);
// //router.get("/", tweetController.create);
// // router.get("/:id", tweetController.show);
// router.post("/tweetStore", tweetController.store);
// // router.get("/editar/:id", tweetController.edit);
// // router.patch("/:id", tweetController.update);
// router.delete("/delete/:id", tweetController.destroy);

module.exports = router;
