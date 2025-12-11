const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");

const User = require("./models/User");
const Question = require("./models/Question");
const QuizResult = require("./models/QuizResult");

const app = express();
const PORT = 5000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// Serve static files from the Public folder (HTML, images, etc.)
app.use(express.static(path.join(__dirname, "Public")));
// Also serve root-level files like style.css if needed
app.use(express.static(__dirname));

// Default route → Load LoadingScreen.html
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "Public", "LoadingScreen.html"));
});
// MongoDB connection
mongoose.connect("mongodb://127.0.0.1:27017/quizAppDB")
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error(err));


// -----------------------------------------------------------------------
// Admin Dashboard (Add User/Admin + Add Question)
// -----------------------------------------------------------------------
app.post("/admin-dashboard", async (req, res) => {
  const { username, password, role, question, imageUrl, adminUsername, adminPassword } = req.body;

  // Check admin credentials
  const admin = await User.findOne({ username: adminUsername, password: adminPassword, role: "admin" });
  if (!admin) return res.send("Invalid admin credentials!");

  // Add user/admin
  if (username && password && role) {
    const user = new User({ username, password, role });
    await user.save();
  }

  // Add question
  if (question) {
    const q = new Question({ question, imageUrl, createdBy: admin._id });
    await q.save();
  }

  res.send("Admin action completed!");
});


// -----------------------------------------------------------------------
// Get Questions (For Quiz Page)
// -----------------------------------------------------------------------
app.get("/questions", async (req, res) => {
  const questions = await Question.find();
  res.json(questions);
});


// -----------------------------------------------------------------------
// Submit Quiz Answers
// -----------------------------------------------------------------------
app.post("/submit-quiz", async (req, res) => {
  const { username, answers } = req.body;

  const result = new QuizResult({ username, answers });
  await result.save();

  res.send("Quiz submitted!");
});


// -----------------------------------------------------------------------
// Get All Quiz Results (Admin Only — no auth for simplicity now)
// -----------------------------------------------------------------------
app.get("/results", async (req, res) => {
  const results = await QuizResult.find();
  res.json(results);
});


// Start server
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
