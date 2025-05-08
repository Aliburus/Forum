// controllers/adminController.js
const User = require("../models/userModel");

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}, "-password"); // şifreyi dışarıda bırak
    res.status(200).json(users);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Kullanıcılar alınamadı", error: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;
    await User.findByIdAndDelete(userId);
    res.status(200).json({ message: "Kullanıcı silindi" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Silme işlemi başarısız", error: error.message });
  }
};

module.exports = {
  getAllUsers,
  deleteUser,
};
