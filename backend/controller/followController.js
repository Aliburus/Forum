const Follow = require("../models/followModel");

const followUser = async (req, res) => {
  try {
    const followerId = req.user.id;
    const { followingId } = req.body;

    if (followerId === followingId) {
      return res.status(400).json({ message: "Kendinizi takip edemezsiniz." });
    }

    const existingFollow = await Follow.findOne({
      follower: followerId,
      following: followingId,
    });

    if (existingFollow) {
      return res
        .status(400)
        .json({ message: "Zaten bu kullanıcıyı takip ediyorsunuz." });
    }

    const newFollow = new Follow({
      follower: followerId,
      following: followingId,
    });

    await newFollow.save();
    res.status(201).json({ message: "Başarıyla takip ettiniz." });
  } catch (error) {
    console.error("Takip Hatası:", error);
    res.status(500).json({ message: "Sunucu hatası oluştu." });
  }
};

const unfollowUser = async (req, res) => {
  try {
    const followerId = req.user.id;
    const { followingId } = req.body;

    const follow = await Follow.findOne({
      follower: followerId,
      following: followingId,
    });

    if (!follow) {
      return res
        .status(400)
        .json({ message: "Bu kullanıcıyı takip etmiyorsunuz." });
    }

    await follow.deleteOne();
    res.status(200).json({ message: "Başarıyla takipten çıktınız." });
  } catch (error) {
    console.error("Takipten Çıkma Hatası:", error);
    res.status(500).json({ message: "Sunucu hatası oluştu." });
  }
};

module.exports = {
  followUser,
  unfollowUser,
};
