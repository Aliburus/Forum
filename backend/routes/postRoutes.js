const express = require("express");
const router = express.Router();
const postController = require("../controllers/postController");
const { verifyToken } = require("../middleware/authMiddleware");

// Kullanıcı doğrulamasını ekledik
router.post("/posts", verifyToken, postController.createPost);
router.put("/posts/:id", verifyToken, postController.updatePost);
router.delete("/posts/:id", verifyToken, postController.deletePost);

router.get("/posts", postController.getPosts); // Postları anonim kullanıcılar da görebilir

module.exports = router;
