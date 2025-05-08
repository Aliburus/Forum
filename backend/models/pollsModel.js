const mongoose = require("mongoose");

// Poll Schema (Anketler)
const pollSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    question: {
      type: String,
      required: true,
    },
    is_active: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const Poll = mongoose.model("Poll", pollSchema);

// PollOption Schema (Anket Seçenekleri)
const pollOptionSchema = new mongoose.Schema(
  {
    poll_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Poll",
      required: true,
    },
    option: {
      type: String,
      required: true,
    },
    votes: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const PollOption = mongoose.model("PollOption", pollOptionSchema);

// PollVote Schema (Anket Oyları)
const pollVoteSchema = new mongoose.Schema(
  {
    poll_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Poll",
      required: true,
    },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    option_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "PollOption",
      required: true,
    },
  },
  { timestamps: true }
);

// Aynı kullanıcı aynı ankete bir kez oy verebilir
pollVoteSchema.index({ poll_id: 1, user_id: 1 }, { unique: true });

const PollVote = mongoose.model("PollVote", pollVoteSchema);

module.exports = {
  Poll,
  PollOption,
  PollVote,
};
