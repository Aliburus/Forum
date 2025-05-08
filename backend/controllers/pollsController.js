const { Poll, PollOption, PollVote } = require("../models/pollsModel");

const createPoll = async (req, res) => {
  try {
    const { question, options } = req.body;
    const user = req.user.id;

    const newPoll = new Poll({ question, user });
    await newPoll.save();

    const optionDocs = options.map((opt) => ({
      poll_id: newPoll._id,
      option: opt,
    }));
    await PollOption.insertMany(optionDocs);

    res.status(201).json({ message: "Poll created successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};

const getPolls = async (req, res) => {
  try {
    const polls = await Poll.find().lean();
    const pollIds = polls.map((poll) => poll._id);
    const options = await PollOption.find({ poll_id: { $in: pollIds } });

    const result = polls.map((poll) => {
      return {
        ...poll,
        options: options.filter(
          (opt) => opt.poll_id.toString() === poll._id.toString()
        ),
      };
    });

    res.status(200).json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};

const getPollById = async (req, res) => {
  try {
    const { id } = req.params;
    const poll = await Poll.findById(id).lean();
    if (!poll) {
      return res.status(404).json({ message: "Poll not found" });
    }

    const options = await PollOption.find({ poll_id: id });
    res.status(200).json({ ...poll, options });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};

const updatePoll = async (req, res) => {
  try {
    const { id } = req.params;
    const { question, options } = req.body;

    const updatedPoll = await Poll.findByIdAndUpdate(
      id,
      { question },
      { new: true }
    );
    if (!updatedPoll) {
      return res.status(404).json({ message: "Poll not found" });
    }

    await PollOption.deleteMany({ poll_id: id });
    const updatedOptions = options.map((option) => ({
      poll_id: updatedPoll._id,
      option,
    }));
    await PollOption.insertMany(updatedOptions);

    res.status(200).json({ message: "Poll updated successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};

const deletePoll = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedPoll = await Poll.findByIdAndDelete(id);
    if (!deletedPoll) {
      return res.status(404).json({ message: "Poll not found" });
    }

    await PollOption.deleteMany({ poll_id: id });
    await PollVote.deleteMany({ poll_id: id });

    res.status(200).json({ message: "Poll deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};

const votePoll = async (req, res) => {
  try {
    const { pollId, optionId } = req.body;
    const userId = req.user.id;

    const existingVote = await PollVote.findOne({
      poll_id: pollId,
      user_id: userId,
    });
    if (existingVote) {
      return res
        .status(400)
        .json({ message: "You have already voted for this poll." });
    }

    const newVote = new PollVote({
      poll_id: pollId,
      option_id: optionId,
      user_id: userId,
    });

    await newVote.save();
    await PollOption.findByIdAndUpdate(optionId, { $inc: { votes: 1 } });

    res.status(201).json({ message: "Vote recorded successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = {
  createPoll,
  getPolls,
  getPollById,
  updatePoll,
  deletePoll,
  votePoll,
};
