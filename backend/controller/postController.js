const POST = require("../models/postModel");
const verifyToken = require("../middleware/authMiddleware"); // JWT doğrulama middleware'ini ekliyoruz

// Post oluşturma
const createPost = async (req, res) => {
  try {
    const { title, content } = req.body;
    const user = req.user.id; // JWT'den alınan user id'si

    const newPost = new POST({
      user,
      title,
      content,
    });
    await newPost.save();
    res.status(201).json({ message: "Post created successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error" });
  }
};

// Postları getirme
const getPosts = async (req, res) => {
  try {
    const posts = await POST.find().populate(
      "user",
      "name surname email userType"
    );
    res.status(200).json(posts);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error" });
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

// Routes'da doğrulama işlemi eklemek için middleware ekleyin
module.exports = {
  createPost,
  getPosts,
  updatePost,
  deletePost,
};
