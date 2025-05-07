const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const profilSchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Kullanıcı modeline referans
      required: true,
    },
    bio: String,
    profilePicture: String,
    backgroundImage: String,
    posts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post", // Post modeline referans
      },
    ],
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment", // Comment modeline referans
      },
    ],
    polls: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Poll", // Poll modeline referans
      },
    ],
  },
  { timestamps: true }
);

const Profil = mongoose.model("Profil", profilSchema);

module.exports = Profil;
