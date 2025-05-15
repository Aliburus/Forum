const jwt = require("jsonwebtoken");
const secretKey = process.env.JWT_SECRET_KEY;

const verifyToken = (req, res, next) => {
  const token = req.cookies.token; // header yerine cookie’den alıyoruz
  if (!token) return res.status(401).json({ message: "Token yok." });

  try {
    const decoded = jwt.verify(token, secretKey);
    req.user = decoded; // { id, userType }
    next();
  } catch (err) {
    return res.status(403).json({ message: "Geçersiz token." });
  }
};

const adminOnly = (req, res, next) => {
  if (req.user?.userType !== "admin") {
    return res
      .status(403)
      .json({ message: "Bu alana sadece adminler erişebilir." });
  }
  next();
};

module.exports = { verifyToken, adminOnly };
