const express = require("express");
const User = require("../models/User");

const router = express.Router();
//Churn Risk Categories
//High Risk (Most likely to churn)
//Medium Risk (Moderate chance of churn)
//Low Risk (Active users, less likely to churn)
// AI churn prediction
const predictChurn = (user) => {
  if (user.engagementScore < 40 && new Date() - new Date(user.lastLogin) > 30 * 24 * 60 * 60 * 1000) {
    return "High";
  } else if (user.engagementScore < 60) {
    return "Medium";
  }
  return "Low";
};

//  churn predictions
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
