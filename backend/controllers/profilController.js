const Profil = require("../models/profilModel");
const Follow = require("../models/followModel");

const getProfil = async (req, res) => {
  try {
    const profil = await Profil.findById(req.params.id)
      .populate("userId", "name surname") // Kullanıcı adı ve soyadı bilgilerini dahil et
      .populate("posts") // Kullanıcının paylaştığı postları dahil et
      .populate("comments") // Kullanıcının yaptığı yorumları dahil et
      .populate("polls"); // Kullanıcının oluşturduğu anketleri dahil et

    if (!profil) {
      return res.status(404).json({ message: "Profil bulunamadı" });
    }

    // Takipçi ve takip edilen sayısını daha verimli almak için aggregation kullanabilirsiniz
    const [followingCount, followersCount] = await Promise.all([
      Follow.countDocuments({ follower: req.params.id }),
      Follow.countDocuments({ following: req.params.id }),
    ]);

    res.status(200).json({
      profil,
      followingCount,
      followersCount,
    });
  } catch (error) {
    res.status(500).json({ message: "Sunucu hatası", error: error.message });
  }
};

const createProfil = async (req, res) => {
  try {
    const { userId, bio, profilePicture, backgroundImage } = req.body;
    const newProfil = new Profil({
      userId,
      bio,
      profilePicture,
      backgroundImage,
    });
    await newProfil.save();
    res.status(201).json(newProfil);
  } catch (error) {
    res.status(500).json({ message: "Sunucu hatası", error: error.message });
  }
};

const updateProfil = async (req, res) => {
  try {
    const { bio, profilePicture, backgroundImage } = req.body;
    const updatedProfil = await Profil.findByIdAndUpdate(
      req.params.id,
      { bio, profilePicture, backgroundImage },
      { new: true }
    );
    if (!updatedProfil) {
      return res.status(404).json({ message: "Profil bulunamadı" });
    }
    res.status(200).json(updatedProfil);
  } catch (error) {
    res.status(500).json({ message: "Sunucu hatası", error: error.message });
  }
};

const deleteProfil = async (req, res) => {
  try {
    const deletedProfil = await Profil.findByIdAndDelete(req.params.id);
    if (!deletedProfil) {
      return res.status(404).json({ message: "Profil bulunamadı" });
    }
    res.status(200).json({ message: "Profil silindi" });
  } catch (error) {
    res.status(500).json({ message: "Sunucu hatası", error: error.message });
  }
};

module.exports = {
  getProfil,
  createProfil,
  updateProfil,
  deleteProfil,
};
