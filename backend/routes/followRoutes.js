const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middleware/authMiddleware");
const { followUser, unfollowUser } = require("../controllers/followController");

router.post("/follow", verifyToken, followUser);
router.post("/unfollow", verifyToken, unfollowUser);

module.exports = router;
