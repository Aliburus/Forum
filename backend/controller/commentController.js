const jwt = require("jsonwebtoken");
const COMMENT = require("../models/commentModel");
const verifyToken = require("../middleware/verifyToken");

const createComment = async (req, res) => {
  try {
    const { postId, content } = req.body;

    if (!postId || !content) {
      return res.status(400).json({ message: "Eksik veriler" });
    }

    const user = req.user; // `verifyToken` middleware'ı ile `req.user` içine gelen kullanıcı bilgisi

    const newComment = new COMMENT({
      user: user.id, // `req.user.id` ile yorum yapan kullanıcıyı alıyoruz
      post: postId,
      content,
    });

    await newComment.save();

    res.status(201).json({ message: "Yorum başarıyla oluşturuldu" });
  } catch (err) {
    console.error("Yorum oluşturulurken hata:", err);
    res.status(500).json({ message: "Sunucu hatası", error: err.message });
  }
};
const getComments = async (req, res) => {
  try {
    const { postId } = req.params;

    if (!postId) {
      return res.status(400).json({ message: "Eksik veriler" });
    }

    const comments = await COMMENT.find({ post: postId }).populate(
      "user",
      "username"
    );

    res.status(200).json(comments);
  } catch (err) {
    console.error("Yorumları getirirken hata:", err);
    res.status(500).json({ message: "Sunucu hatası", error: err.message });
  }
};
const deleteComment = async (req, res) => {
  try {
    const { commentId } = req.params;

    if (!commentId) {
      return res.status(400).json({ message: "Eksik veriler" });
    }

    const user = req.user; // `verifyToken` middleware'ı ile gelen kullanıcı

    // Yorumun sahibini kontrol et
    const comment = await COMMENT.findById(commentId);
    if (!comment) {
      return res.status(404).json({ message: "Yorum bulunamadı" });
    }

    if (comment.user.toString() !== user.id) {
      return res
        .status(403)
        .json({ message: "Yorum sadece sahibi tarafından silinebilir" });
    }

    await comment.remove();

    res.status(200).json({ message: "Yorum başarıyla silindi" });
  } catch (err) {
    console.error("Yorum silinirken hata:", err);
    res.status(500).json({ message: "Sunucu hatası", error: err.message });
  }
};

const updateComment = async (req, res) => {
  try {
    const { commentId } = req.params;
    const { content } = req.body;

    if (!commentId || !content) {
      return res.status(400).json({ message: "Eksik veriler" });
    }

    const user = req.user; // `verifyToken` middleware'ı ile `req.user` içinde gelen kullanıcı

    // Yorumun sahibini kontrol et
    const comment = await COMMENT.findById(commentId);
    if (!comment) {
      return res.status(404).json({ message: "Yorum bulunamadı" });
    }

    if (comment.user.toString() !== user.id) {
      return res
        .status(403)
        .json({ message: "Yorum sadece sahibi tarafından güncellenebilir" });
    }

    comment.content = content;
    const updatedComment = await comment.save();

    res
      .status(200)
      .json({ message: "Yorum başarıyla güncellendi", updatedComment });
  } catch (err) {
    console.error("Yorum güncellenirken hata:", err);
    res.status(500).json({ message: "Sunucu hatası", error: err.message });
  }
};

const likeComment = async (req, res) => {
  try {
    const { commentId } = req.params;
    const { userId } = req.body;

    if (!commentId || !userId) {
      return res.status(400).json({ message: "Eksik veriler" });
    }

    const comment = await COMMENT.findById(commentId);

    if (!comment) {
      return res.status(404).json({ message: "Yorum bulunamadı" });
    }

    // Eğer kullanıcı zaten beğenmişse, hata döndür
    if (comment.likes.some((like) => like.toString() === userId)) {
      return res.status(400).json({ message: "Zaten beğenildi" });
    }

    // Eğer kullanıcı beğenmeyi iptal etmişse, beğeniden çıkar
    if (comment.dislikes.some((dislike) => dislike.toString() === userId)) {
      comment.dislikes = comment.dislikes.filter(
        (dislike) => dislike.toString() !== userId
      );
    }

    // Yorumun beğeni listesine kullanıcıyı ekle
    comment.likes.push(userId);
    await comment.save();

    res.status(200).json({ message: "Yorum beğenildi", comment });
  } catch (err) {
    console.error("Yorum beğenirken hata:", err);
    res.status(500).json({ message: "Sunucu hatası", error: err.message });
  }
};

const dislikeComment = async (req, res) => {
  try {
    const { commentId } = req.params;
    const { userId } = req.body;

    if (!commentId || !userId) {
      return res.status(400).json({ message: "Eksik veriler" });
    }

    const comment = await COMMENT.findById(commentId);

    if (!comment) {
      return res.status(404).json({ message: "Yorum bulunamadı" });
    }

    // Eğer kullanıcı yorum beğenmediyse, dislike işlemi yapılmaz
    if (comment.likes.some((like) => like.toString() === userId)) {
      // Kullanıcıyı beğeni listesinden çıkar
      comment.likes = comment.likes.filter((id) => id.toString() !== userId);
    } else {
      return res.status(400).json({ message: "Henüz beğenilmedi" });
    }

    // Yorumun beğenmekten çıkarıldıktan sonra kullanıcıyı beğenmekten çıkarma işlemi yapılır
    if (!comment.dislikes.some((dislike) => dislike.toString() === userId)) {
      comment.dislikes.push(userId);
    }

    await comment.save();

    res.status(200).json({ message: "Yorum beğenmekten çıkarıldı", comment });
  } catch (err) {
    console.error("Yorum beğenmekten çıkarılırken hata:", err);
    res.status(500).json({ message: "Sunucu hatası", error: err.message });
  }
};

module.exports = {
  createComment,
  getComments,
  deleteComment,
  updateComment,
  likeComment,
  dislikeComment,
};
