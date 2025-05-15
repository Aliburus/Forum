const bcrypt = require("bcryptjs");
const User = require("../models/usermodel");

// Yeni kullanıcı oluşturma
const createUser = async (req, res) => {
  try {
    const name = req.body.name?.trim();
    const surname = req.body.surname?.trim();
    const email = req.body.email?.trim().toLowerCase();
    const password = req.body.password?.trim();

    if (!name || !surname || !email || !password) {
      return res.status(400).json({ message: "Tüm alanları doldurun." });
    }

    // Şifreyi hash'le
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Yeni kullanıcı oluştur
    const newUser = new User({
      name,
      surname,
      email,
      password: hashedPassword,
      userType: "user",
    });

    await newUser.save();
    console.log("Yeni kullanıcı oluşturuldu:", email);

    res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    console.error("createUser error:", err);
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};

// Tüm kullanıcıları listeleme
const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    console.error("getUsers error:", err);
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};

// ID ile kullanıcı getirme
const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (err) {
    console.error("getUserById error:", err);
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};

// Kullanıcı güncelleme
const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, surname, email, password } = req.body;
    const updates = {};

    if (name) updates.name = name.trim();
    if (surname) updates.surname = surname.trim();
    if (email) updates.email = email.trim().toLowerCase();
    if (password) {
      const cleanPass = password.trim();
      updates.password = await bcrypt.hash(cleanPass, 10);
    }

    const updatedUser = await User.findByIdAndUpdate(id, updates, {
      new: true,
    });
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(updatedUser);
  } catch (err) {
    console.error("updateUser error:", err);
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};

// Kullanıcı silme
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User deleted successfully" });
  } catch (err) {
    console.error("deleteUser error:", err);
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};

// Email ile kullanıcı getirme
const getUserByEmail = async (req, res) => {
  try {
    const { email } = req.params;
    const user = await User.findOne({ email: email.trim().toLowerCase() });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (err) {
    console.error("getUserByEmail error:", err);
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};
const getProfile = async (req, res) => {
  try {
    const userId = req.user.id; // JWT'den gelen user id
    const user = await User.findById(userId).select("-password"); // şifreyi dahil etme

    if (!user) {
      return res.status(404).json({ message: "Kullanıcı bulunamadı" });
    }

    res.status(200).json(user);
  } catch (err) {
    console.error("getProfile error:", err);
    res.status(500).json({ message: "Sunucu hatası", error: err.message });
  }
};
// controllers/userController.js

const changePassword = async (req, res) => {
  try {
    const userId = req.user.id;
    const { currentPassword, newPassword } = req.body;
    if (!currentPassword || !newPassword) {
      return res.status(400).json({ message: "Mevcut ve yeni şifre gerekli." });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "Kullanıcı bulunamadı." });
    }

    // Mevcut şifreyi doğrula
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Mevcut şifre yanlış." });
    }

    // **Only assign the raw new password** — let your pre('save') hook hash it once
    user.password = newPassword;
    await user.save();

    res.status(200).json({ message: "Şifre başarıyla değiştirildi." });
  } catch (err) {
    console.error("changePassword error:", err);
    res.status(500).json({ message: "Sunucu hatası", error: err.message });
  }
};

module.exports = {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  getUserByEmail,
  getProfile,
  changePassword,
};
