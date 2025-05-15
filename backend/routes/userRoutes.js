const express = require("express");
const userController = require("../controllers/userController");
const { login, logout } = require("../controllers/authController");
const { verifyToken } = require("../middleware/authMiddleware");
const { changePassword } = require("../controllers/userController");
const router = express.Router();

router.post("/users/register", userController.createUser);
router.post("/users/login", login);
router.post("/users/logout", logout);

router.get("/users", userController.getUsers);
router.get("/users/:id", userController.getUserById);
router.get("/users/email/:email", userController.getUserByEmail);
router.put("/users/:id", userController.updateUser);
router.delete("/users/:id", userController.deleteUser);

// Profil bilgisi cookie-based auth ile
router.get("/profile", verifyToken, userController.getProfile);

router.put("/change-password", verifyToken, changePassword);
module.exports = router;
