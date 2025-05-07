const express = require("express");
const router = express.Router();
const {
  createPoll,
  getPolls,
  getPollById,
  updatePoll,
  deletePoll,
  votePoll,
} = require("../controller/pollsController");
const verifyToken = require("../middleware/verifyToken");

router.post("/polls", verifyToken, createPoll);
router.put("/polls/:id", verifyToken, updatePoll);
router.delete("/polls/:id", verifyToken, deletePoll);
router.post("/polls/vote", verifyToken, votePoll);
router.get("/polls", getPolls);
router.get("/polls/:id", getPollById);

module.exports = router;
