const express = require("express");
const User = require("../models/User");

const router = express.Router();

// active users calculate kre
//basis of last login
const getActiveUsers = async (days) => {
  const sinceDate = new Date();
  sinceDate.setDate(sinceDate.getDate() - days);
  return await User.countDocuments({ lastLogin: { $gte: sinceDate } });
};

// engagement metrics
router.get("/", async (req, res) => {
  try {
    const dailyActive = await getActiveUsers(1);
    const weeklyActive = await getActiveUsers(7);
    const monthlyActive = await getActiveUsers(30);
    const allUsers = await User.find();

    //  average engagement score
    const avgEngagementScore = allUsers.length
      ? allUsers.reduce((sum, user) => sum + user.engagementScore, 0) / allUsers.length
      : 0;

    // retention rate (Users who logged in last 7 days)
    // formula - weekly/total*100
    const retentionRate = allUsers.length ? (weeklyActive / allUsers.length) * 100 : 0;

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
