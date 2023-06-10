const express = require("express");
const router = express.Router();
const { expressjwt: checkJwt } = require("express-jwt");
const tweetController = require("../controllers/tweetController");
//const userController = require("../controllers/userController");



router.get("/", checkJwt({ secret: process.env.JWT_SECRET_STRING, algorithms: ["HS256"] }), tweetController.index);
//router.get("/:id", userController.show);
router.post("/", checkJwt({ secret: process.env.JWT_SECRET_STRING, algorithms: ["HS256"] }), tweetController.store);

router.delete("/:id", checkJwt({ secret: process.env.JWT_SECRET_STRING, algorithms: ["HS256"] }),  tweetController.destroy);

router.patch("/:id/like", checkJwt({ secret: process.env.JWT_SECRET_STRING, algorithms: ["HS256"] }), tweetController.likes);
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
