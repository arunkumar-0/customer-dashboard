const express = require("express");
const User = require("../models/User");

const router = express.Router();

// Mock AI churn prediction
const predictChurn = (user) => {
  if (user.engagementScore < 40 && new Date() - new Date(user.lastLogin) > 30 * 24 * 60 * 60 * 1000) {
    return "High";
  } else if (user.engagementScore < 60) {
    return "Medium";
  }
  return "Low";
};

// Get churn predictions
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    const churnPredictions = users.map(user => ({
      name: user.name,
      email: user.email,
      engagementScore: user.engagementScore,
      churnRisk: predictChurn(user),
    }));
    res.json(churnPredictions);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch predictions" });
  }
});

module.exports = router;
