const express = require("express");
const User = require("../models/User");

const router = express.Router();

// Get all users
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch users" });
  }
});

// Function to calculate engagement score (Example: Based on last login)
const calculateEngagementScore = (lastLogin) => {
    const daysSinceLogin = (Date.now() - new Date(lastLogin)) / (1000 * 60 * 60 * 24);
    if (daysSinceLogin < 3) return 90;
    if (daysSinceLogin < 7) return 60;
    return 30;
  };
  
  // Get users with calculated engagement score
  router.get("/", async (req, res) => {
    try {
      const users = await User.find();
      const usersWithScores = users.map(user => ({
        ...user._doc,
        engagementScore: calculateEngagementScore(user.lastLogin),
      }));
      res.json(usersWithScores);
    } catch (err) {
      res.status(500).json({ error: "Failed to fetch users" });
    }
  });
  

module.exports = router;
