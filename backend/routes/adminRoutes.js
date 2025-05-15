const express = require("express");
const router = express.Router();
const adminMiddleware = require("../middleware/adminMiddleware");
const {
  getDashboardStats,
  getAllUsers,
  deleteUser,
  updateUserRole,
  getAllPosts,
  deletePost,
} = require("../controllers/adminController");

// Admin dashboard istatistikleri
router.get("/dashboard", adminMiddleware, getDashboardStats);

// Kullanıcı işlemleri
router.get("/users", adminMiddleware, getAllUsers);
router.delete("/users/:id", adminMiddleware, deleteUser);
router.patch("/users/:id/role", adminMiddleware, updateUserRole);

// Gönderi işlemleri
router.get("/posts", adminMiddleware, getAllPosts);
router.delete("/posts/:id", adminMiddleware, deletePost);

module.exports = router;
