const express = require("express");
const User = require("../models/User");

const router = express.Router();

// Function to calculate active users based on last login
const getActiveUsers = async (days) => {
  const sinceDate = new Date();
  sinceDate.setDate(sinceDate.getDate() - days);
  return await User.countDocuments({ lastLogin: { $gte: sinceDate } });
};

// Function to calculate engagement score
const calculateEngagementScore = (user, maxActions, maxSessionTime) => {
  const W1 = 0.4, // Login Frequency
    W2 = 0.2, // Time Spent
    W3 = 0.3, //  Actions Taken
    W4 = 0.1; //  Consistency Score

  // Login Frequency (Last 30 Days)
  const loginFrequency = user.loginsLast30Days / 30; // Normalize (0-1)

  // Time Spent per Session (normalized)
  const timeSpent = user.avgSessionTime / maxSessionTime; // Normalize (0-1)

  // Actions Taken (normalized)
  const actionsTaken = maxActions > 0 ? user.actionsLast30Days / maxActions : 0; // Normalize (0-1)

  // Consistency Score (Days Active in Last 30 Days)
  const consistencyScore = user.daysActiveLast30Days / 30; // Normalize (0-1)

  // Engagement Score Calculation
  return (
    W1 * loginFrequency +
    W2 * timeSpent +
    W3 * actionsTaken +
    W4 * consistencyScore
  ).toFixed(2);
};

// Route to fetch engagement metrics
router.get("/", async (req, res) => {
  try {
    const dailyActive = await getActiveUsers(1);
    const weeklyActive = await getActiveUsers(7);
    const monthlyActive = await getActiveUsers(30);
    const allUsers = await User.find();

    if (!allUsers.length) {
      return res.json({
        dailyActive,
        weeklyActive,
        monthlyActive,
        avgEngagementScore: "0.00",
        retentionRate: "0.00%",
      });
    }

    // Find max values for normalization
    const maxActions = Math.max(...allUsers.map((u) => u.actionsLast30Days || 0));
    const maxSessionTime = Math.max(...allUsers.map((u) => u.avgSessionTime || 1));

    // Calculate Engagement Score for each user
    allUsers.forEach((user) => {
      user.engagementScore = calculateEngagementScore(user, maxActions, maxSessionTime);
    });

    // Average Engagement Score
    const avgEngagementScore =
      allUsers.reduce((sum, user) => sum + parseFloat(user.engagementScore), 0) /
      allUsers.length;

    // Retention Rate (Users logged in last 7 days)
    const retentionRate = (weeklyActive / allUsers.length) * 100;

    res.json({
      dailyActive,
      weeklyActive,
      monthlyActive,
      avgEngagementScore: avgEngagementScore.toFixed(2),
      retentionRate: retentionRate.toFixed(2) + "%",
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch metrics" });
  }
});

module.exports = router;
