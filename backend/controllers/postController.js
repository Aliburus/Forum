const Post = require("../models/postModel"); // Modeli doğru bir şekilde import ediyoruz.
const mongoose = require("mongoose");

const createPost = async (req, res) => {
  try {
    console.log("📝 createPost body:", req.body);
    console.log("👤 authenticated user:", req.user);

    const { content } = req.body;
    if (!content) {
      return res.status(400).json({ error: "Content is required" });
    }

    const newPost = new Post({
      user: req.user.id, // verifyToken middleware’ın req.user.id verdiğinden emin ol
      content,
    });

    const saved = await newPost.save();
    // populate edip dön
    const populated = await saved.populate("user", "name username");
    return res.status(201).json(populated);
  } catch (err) {
    console.error("🔥 createPost ERROR:", err);
    return res.status(500).json({ error: err.message });
  }
};

// Postları getirme
const getPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .sort({ createdAt: -1 })
      .populate("user", "name username") // <-- populate ile user bilgilerini ekliyoruz
      .lean();
    res.json(posts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

const updatePost = async (req, res) => {
  try {
    const { id } = req.params; // URL'den gelen ID'yi alıyoruz
    const { content } = req.body; // Güncellenmiş içeriği alıyoruz

    console.log("Gelen ID:", id); // ID'yi logla

    // Geçerli bir ObjectId olup olmadığını kontrol ediyoruz
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Geçersiz ID" });
    }

    // Postu güncelle
    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { content }, // Sadece content'i güncelliyoruz
      { new: true } // Güncellenmiş postu döndürüyoruz
    );

    if (!updatedPost) {
      return res.status(404).json({ message: "Post bulunamadı" });
    }

    res.status(200).json(updatedPost);
  } catch (err) {
    console.error("🔥 updatePost ERROR:", err);
    res.status(500).json({ error: err.message });
  }
};
const deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedPost = await Post.findByIdAndDelete(id); // Burada doğru model `Post`
    if (!deletedPost) {
      return res.status(404).json({ message: "Post bulunamadı" });
    }
    res.status(200).json({ message: "Post deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};
const likePost = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const post = await POST.findById(id);
    if (!post) return res.status(404).json({ message: "Post not found" });

    let updated = false;

    if (post.likedBy.includes(userId)) {
      post.likedBy.pull(userId);
      post.like = Math.max(post.like - 1, 0);
      updated = true;
    } else {
      if (post.dislikedBy.includes(userId)) {
        post.dislikedBy.pull(userId);
        post.dislike = Math.max(post.dislike - 1, 0);
      }
      post.likedBy.push(userId);
      post.like += 1;
      updated = true;
    }

    if (updated) await post.save();

    // sadece `user`'ı doldur, başka ilişkilerle uğraşma
    await post.populate("user", "name username");

    res.status(200).json(post);
  } catch (err) {
    console.error("🔥 likePost ERROR:", err);
    res.status(500).json({ message: "Server Error" });
  }
};

// Dislike post
const dislikePost = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const post = await POST.findById(id);
    if (!post) return res.status(404).json({ message: "Post not found" });

    let updated = false;

    if (post.dislikedBy.includes(userId)) {
      post.dislikedBy.pull(userId);
      post.dislike = Math.max(post.dislike - 1, 0);
      updated = true;
    } else {
      if (post.likedBy.includes(userId)) {
        post.likedBy.pull(userId);
        post.like = Math.max(post.like - 1, 0);
      }
      post.dislikedBy.push(userId);
      post.dislike += 1;
      updated = true;
    }

    if (updated) await post.save();

    await post.populate("user", "name username");

    res.status(200).json(post);
  } catch (err) {
    console.error("🔥 dislikePost ERROR:", err);
    res.status(500).json({ message: "Server Error" });
  }
};
const getPostsForUser = async (req, res) => {
  try {
    const posts = await Post.find({ user: req.user.id })
      .sort({ createdAt: -1 })
      .populate("user", "name username")
      .lean();
    res.json(posts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};
// Routes'da doğrulama işlemi eklemek için middleware ekleyin
module.exports = {
  createPost,
  getPosts,
  updatePost,
  deletePost,
  likePost,
  dislikePost,
  getPostsForUser,
};
