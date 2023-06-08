const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const tweetController = require("../controllers/tweetController");
const { expressjwt: checkJwt } = require("express-jwt");

router.get(
  "/:username",
  checkJwt({ secret: process.env.JWT_SECRET_STRING, algorithms: ["HS256"] }),
  userController.show,
);

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
