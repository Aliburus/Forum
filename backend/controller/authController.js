// controllers/authController.js
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");

const secretKey = process.env.JWT_SECRET_KEY;

// Giriş işlemi
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Kullanıcıyı veritabanında bul
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "Kullanıcı bulunamadı." });
    }

    // Şifreyi kontrol et
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Şifre geçersiz." });
    }

    // JWT token oluştur (sadece id içerecek şekilde)
    const token = jwt.sign(
      { id: user._id }, // sadece ID gönderiyoruz
      secretKey,
      { expiresIn: "1h" }
    );

    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: "Sunucu hatası", error });
  }
};
const refreshToken = async (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(400).json({ message: "Refresh token gereklidir." });
  }

  try {
    const decoded = jwt.verify(refreshToken, secretKey);

    // Yeni bir JWT token oluştur
    const newToken = jwt.sign(
      { id: decoded.id }, // Aynı payload yapısı
      secretKey,
      { expiresIn: "1h" }
    );

    res.status(200).json({ token: newToken });
  } catch (error) {
    res.status(403).json({ message: "Geçersiz refresh token." });
  }
};

module.exports = { login, refreshToken };
