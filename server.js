const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const User = require("./models/User");
const Question = require("./models/Question");
const QuizResult = require("./models/QuizResult");

const app = express();
const PORT = 5000;

app.use(bodyParser.json());
app.use(express.static("public"));

mongoose.connect("mongodb://127.0.0.1:27017/quizAppDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("MongoDB connected"))
.catch(err => console.error(err));

// Admin dashboard - add user/admin and question
app.post("/admin-dashboard", async (req, res) => {
  const { username, password, role, question, imageUrl, adminUsername, adminPassword } = req.body;

  // verify admin credentials
  const admin = await User.findOne({ username: adminUsername, password: adminPassword, role: "admin" });
  if(!admin) return res.send("Invalid admin credentials!");

  // Add user/admin
  if(username && password && role){
    const user = new User({ username, password, role });
    await user.save();
  }

  // Add question
  if(question){
    const q = new Question({ question, imageUrl, createdBy: admin._id });
    await q.save();
  }

  res.send("Admin action completed!");
});

// Get questions for users
app.get("/questions", async (req, res) => {
  const questions = await Question.find();
  res.json(questions);
});

// Submit quiz
app.post("/submit-quiz", async (req, res) => {
  const { username, answers } = req.body;
  const result = new QuizResult({ username, answers });
  await result.save();
  res.send("Quiz submitted!");
});

// Get all results for admin
app.get("/results", async (req, res) => {
  const results = await QuizResult.find();
  res.json(results);
});

app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
