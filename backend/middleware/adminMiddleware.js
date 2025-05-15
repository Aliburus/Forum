const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const adminMiddleware = async (req, res, next) => {
  try {
    // Token kontrolü
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res
        .status(401)
        .json({ message: "Yetkilendirme token'ı bulunamadı" });
    }

    // Token doğrulama
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Kullanıcı kontrolü
    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(404).json({ message: "Kullanıcı bulunamadı" });
    }

    // Admin kontrolü
    if (user.userType !== "admin") {
      return res
        .status(403)
        .json({ message: "Bu işlem için admin yetkisi gerekiyor" });
    }

    // Admin bilgisini request'e ekle
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Geçersiz token" });
  }
};

module.exports = adminMiddleware;
