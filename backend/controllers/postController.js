const POST = require("../models/postModel");

// Post oluşturma
const Post = require("../models/postModel");

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
      // (Title artık schema’da yok, başka required alan da yok.)
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
      .populate("user", "name username") // <-- burayı ekledik
      .lean();
    res.json(posts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

// Post güncelleme
const updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;
    const updatedPost = await POST.findByIdAndUpdate(
      id,
      { title, content },
      { new: true }
    );
    if (!updatedPost) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.status(200).json(updatedPost);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error" });
  }
};

// Post silme
const deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedPost = await POST.findByIdAndDelete(id);
    if (!deletedPost) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.status(200).json({ message: "Post deleted successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error" });
  }
};
const likePost = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const post = await POST.findById(id);
    if (!post) return res.status(404).json({ message: "Post not found" });

    if (post.likedBy.includes(userId)) {
      return res.status(400).json({ message: "Bu postu zaten beğendiniz" });
    }

    if (post.dislikedBy.includes(userId)) {
      post.dislikedBy.pull(userId);
      post.dislike -= 1;
    }

    post.like += 1;
    post.likedBy.push(userId);
    await post.save();

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

    if (post.dislikedBy.includes(userId)) {
      return res.status(400).json({ message: "Bu postu zaten beğenmediniz" });
    }

    if (post.likedBy.includes(userId)) {
      post.likedBy.pull(userId);
      post.like -= 1;
    }

    post.dislike += 1;
    post.dislikedBy.push(userId);
    await post.save();

    res.status(200).json(post);
  } catch (err) {
    console.error("🔥 dislikePost ERROR:", err);
    res.status(500).json({ message: "Server Error" });
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
};
