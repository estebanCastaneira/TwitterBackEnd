const express = require("express");
const router = express.Router();
const tweetController = require("../controllers/tweetController");

router.get("/", tweetController.index);
// router.get("/:id", tweetController.show);
// router.post("/", tweetController.store);
// router.patch("/:id", tweetController.update);
// router.delete("/:id", tweetController.destroy);

// // router.get("/", tweetController.index);
// //router.get("/", tweetController.create);
// // router.get("/:id", tweetController.show);
// router.post("/tweetStore", tweetController.store);
// // router.get("/editar/:id", tweetController.edit);
// // router.patch("/:id", tweetController.update);
// router.delete("/delete/:id", tweetController.destroy);

module.exports = router;
