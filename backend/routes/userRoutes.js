// routes/userRoutes.js
const express = require("express");
const verifyToken = require("../middleware/authMiddleware");
const userController = require("../controller/userController");
const router = express.Router();

// Kullanıcı ekleme
router.post("/users", userController.createUser);

// Kullanıcıları listeleme
router.get("/users", userController.getUsers);

// Kullanıcıyı ID ile getirme
router.get("/users/:id", userController.getUserById);

// Kullanıcıyı güncelleme
router.put("/users/:id", userController.updateUser);

// Kullanıcıyı silme
router.delete("/users/:id", userController.deleteUser);

// Kullanıcıyı email ile getirme
router.get("/users/email/:email", userController.getUserByEmail);

module.exports = router;
