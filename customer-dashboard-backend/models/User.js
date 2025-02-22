const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  lastLogin: { type: Date, default: null },

  // Engagement Tracking Fields
  loginsLast30Days: { type: Number, default: 0 }, 
  avgSessionTime: { type: Number, default: 0 },    
  actionsLast30Days: { type: Number, default: 0 }, 
  daysActiveLast30Days: { type: Number, default: 0 },

  engagementScore: { type: Number, default: 0 }, // Computed engagement score
  retentionCategory: { type: String, default: "New" }, // "High", "Medium", "Low"
});

module.exports = mongoose.model("User", UserSchema);
