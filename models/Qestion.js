const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  question: String,
  imageUrl: String, // optional image URL
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
});

module.exports = mongoose.model("Question", questionSchema);
