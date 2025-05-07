const express = require("express");
const router = express.Router();
const commentController = require("../controllers/commentController");
const verifyToken = require("../middleware/verifyToken");

router.post("/comments", verifyToken, commentController.createComment);
router.put(
  "/comments/:commentId",
  verifyToken,
  commentController.updateComment
);
router.delete(
  "/comments/:commentId",
  verifyToken,
  commentController.deleteComment
);
router.post(
  "/comments/:commentId/like",
  verifyToken,
  commentController.likeComment
);
router.post(
  "/comments/:commentId/dislike",
  verifyToken,
  commentController.dislikeComment
);
router.get("/comments/:postId", commentController.getComments);

module.exports = router;
