const jwt = require("jsonwebtoken");
const secretKey = process.env.JWT_SECRET_KEY;

const verifyToken = (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1]; // Bearer <token>

  if (!token) {
    return res.status(401).json({
      message: "Token bulunamadı. Lütfen giriş yapın.",
    });
  }

  try {
    const decoded = jwt.verify(token, secretKey);
    req.user = decoded;
    next();
  } catch (error) {
    console.error("JWT Hatası:", error);
    res.status(403).json({ message: "Geçersiz token." });
  }
};

module.exports = verifyToken;
