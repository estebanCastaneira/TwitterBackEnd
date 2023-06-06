const express = require("express");
const router = express.Router();
const tweetController = require("../controllers/tweetController");
const isOwner = require("../middlewares/isOwner");

// router.get("/", tweetController.index);
//router.get("/", tweetController.create);
// router.get("/:id", tweetController.show);
router.post("/tweetStore", tweetController.store);
// router.get("/editar/:id", tweetController.edit);
// router.patch("/:id", tweetController.update);
router.delete("/delete/:id", isOwner, tweetController.destroy);

module.exports = router;
