const User = require("../models/userModel");
const Post = require("../models/postModel");

// Admin dashboard istatistikleri
const getDashboardStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalPosts = await Post.countDocuments();
    const recentUsers = await User.find().sort({ createdAt: -1 }).limit(5);
    const recentPosts = await Post.find().sort({ createdAt: -1 }).limit(5);

    res.json({
      stats: {
        totalUsers,
        totalPosts,
      },
      recentUsers,
      recentPosts,
    });
  } catch (error) {
    res.status(500).json({ message: "Sunucu hatası" });
  }
};

// Tüm kullanıcıları listele
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Sunucu hatası" });
  }
};

// Kullanıcı silme
const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "Kullanıcı başarıyla silindi" });
  } catch (error) {
    res.status(500).json({ message: "Sunucu hatası" });
  }
};

// Kullanıcı rolünü güncelleme
const updateUserRole = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { userType: req.body.userType },
      { new: true }
    ).select("-password");
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Sunucu hatası" });
  }
};

// Tüm gönderileri listele
const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate("author", "username");
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: "Sunucu hatası" });
  }
};

// Gönderi silme
const deletePost = async (req, res) => {
  try {
    await Post.findByIdAndDelete(req.params.id);
    res.json({ message: "Gönderi başarıyla silindi" });
  } catch (error) {
    res.status(500).json({ message: "Sunucu hatası" });
  }
};

module.exports = {
  getDashboardStats,
  getAllUsers,
  deleteUser,
  updateUserRole,
  getAllPosts,
  deletePost,
};
