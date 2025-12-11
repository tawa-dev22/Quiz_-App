const mongoose = require("mongoose");

const quizResultSchema = new mongoose.Schema({
  username: String,          // user who submitted
  answers: [{ question: String, answer: String }],
  submittedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("QuizResult", quizResultSchema);
