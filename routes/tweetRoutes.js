const express = require("express");
const router = express.Router();
const { expressjwt: checkJwt } = require("express-jwt");
const tweetController = require("../controllers/tweetController");
//const userController = require("../controllers/userController");

router.use(checkJwt({ secret: process.env.JWT_SECRET_STRING, algorithms: ["HS256"] }));

router.get("/", tweetController.index);
//router.get("/:id", userController.show);
router.post("/", tweetController.store);
router.patch("/:id", tweetController.update);
router.delete("/:id", tweetController.destroy);

router.patch("/:id/like", tweetController.likes);
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
