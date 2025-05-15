// controllers/authController.js
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/userModel");

const secretKey = process.env.JWT_SECRET_KEY;

const login = async (req, res) => {
  const { email, password } = req.body;
  console.log("Login request body:", req.body);

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({ message: "Geçersiz email veya şifre" });
  }

  // Hash’lenmiş şifreyle karşılaştır
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).json({ message: "Geçersiz email veya şifre" });
  }

  // Token oluştur
  const token = jwt.sign(
    { id: user._id, email: user.email, userType: user.userType },
    secretKey,
    { expiresIn: "1h" }
  );
  const refreshToken = jwt.sign({ id: user._id }, secretKey, {
    expiresIn: "7d",
  });

  // Cookie olarak da göndermek istersen:
  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  });

  // JSON cevabında mutlaka token olsun
  return res.status(200).json({
    message: "Giriş başarılı",
    token,
    refreshToken, // opsiyonel
  });
};
const refreshToken = async (req, res) => {
  const refreshToken =
    req.cookies.refreshToken || req.header("Authorization")?.split(" ")[1]; // Cookie veya header'dan al

  if (!refreshToken) {
    return res.status(400).json({ message: "Refresh token gereklidir." });
  }

  try {
    const decoded = jwt.verify(refreshToken, secretKey); // Refresh token'ı doğrulama

    // Yeni JWT token oluşturuluyor
    const newToken = jwt.sign({ id: decoded.id }, secretKey, {
      expiresIn: "1h",
    });

    // Yeni token'ı cookie'ye ekle
    res.cookie("token", newToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 3600000, // 1 saatlik geçerlilik süresi
      sameSite: "Strict",
    });

    res.status(200).json({ message: "Token yenilendi." });
  } catch (error) {
    res.status(403).json({ message: "Geçersiz refresh token." });
  }
};
const logout = (req, res) => {
  // Çerez adını, cookie ayarlarını (sameSite, secure vb.) register ederken kullandığınla aynı yap
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  });

  // Eğer refresh token kullanıyorsan, onu da temizle
  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  });

  return res.status(200).json({ message: "Çıkış başarılı" });
};
const authCheck = (req, res) => {
  return res.status(200).json({ authenticated: true });
};
module.exports = { login, refreshToken, logout, authCheck };
