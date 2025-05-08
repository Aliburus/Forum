// routes/userRoutes.js
const express = require("express");
const userController = require("../controllers/userController");
const login = require("../controllers/authController").login; // login fonksiyonunu authController'dan alıyoruz
const router = express.Router();

// Kullanıcı ekleme
router.post("/register", userController.createUser);
router.post("/login", login);
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
router.post("/logout", require("../controllers/authController").logout);
// Login işlemi

module.exports = router;
