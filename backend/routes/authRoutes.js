const express = require("express");
const {
  login,
  refreshToken,
  logout,
  authCheck,
} = require("../controllers/authController");
const { verifyToken } = require("../middleware/authMiddleware");
const router = express.Router();

// Auth rotaları
router.post("/login", login);
router.post("/logout", logout);
router.post("/refresh-token", refreshToken);
router.get("/auth-check", verifyToken, authCheck);

module.exports = router;
