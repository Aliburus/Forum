const express = require("express");
const { authCheck } = require("../controllers/authController");
const { verifyToken } = require("../middleware/authMiddleware");
const router = express.Router();

router.get("/auth-check", verifyToken, authCheck);
module.exports = router;
