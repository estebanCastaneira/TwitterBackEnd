const express = require("express");
const router = express.Router();
const tweetController = require("../controllers/tweetController");
const { verifyToken } = require("../middlewares/verifyToken");

router.use(verifyToken);

router.get("/", tweetController.index);
router.post("/", tweetController.store);
router.delete("/:id", tweetController.destroy);
router.patch("/:id/like", tweetController.likes);

module.exports = router;
