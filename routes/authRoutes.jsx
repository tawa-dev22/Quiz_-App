const express = require("express");
const router = express.Router();
const User = require("../models/User");
const jwt = require("jsonwebtoken");

// Signup
router.post("/signup", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const user = new User({ username, email, password });
    await user.save();
    res.send("Signup successful!");
  } catch (err) {
    console.error(err);
    res.status(400).send("Error signing up. User may already exist.");
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).send("User not found.");

    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(400).send("Incorrect password.");

    // Generate JWT token
    const token = jwt.sign({ id: user._id }, "SECRET_KEY", { expiresIn: "1h" });

    res.json({ message: "Login successful", token });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

module.exports = router;
