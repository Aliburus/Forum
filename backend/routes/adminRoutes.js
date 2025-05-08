// routes/adminRoutes.js
const express = require("express");
const router = express.Router();

const { verifyToken, adminOnly } = require("../middleware/authMiddleware");
const adminController = require("../controllers/adminController");

// Tüm kullanıcıları listele – sadece admin
router.get("/admin/users", verifyToken, adminOnly, adminController.getAllUsers);

// Belirli kullanıcıyı sil – sadece admin
router.delete(
  "/admin/users/:id",
  verifyToken,
  adminOnly,
  adminController.deleteUser
);

module.exports = router;
