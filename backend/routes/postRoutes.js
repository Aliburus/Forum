const express = require("express");
const router = express.Router();
const postController = require("../controllers/postController");
const { verifyToken } = require("../middleware/authMiddleware");

// Kullanıcı doğrulamasını ekledik
router.post("/posts", verifyToken, postController.createPost);
router.put("/posts/:id", verifyToken, postController.updatePost);
router.delete("/posts/:id", verifyToken, postController.deletePost);

router.get("/posts", postController.getPosts);
router.post("/posts/:id/like", verifyToken, postController.likePost);
router.post("/posts/:id/dislike", verifyToken, postController.dislikePost);
module.exports = router;
