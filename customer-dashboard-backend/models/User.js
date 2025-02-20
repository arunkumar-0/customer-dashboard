const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  lastLogin: Date,
  engagementScore: Number,
  retentionCategory: String, // High, Medium, Low
});

module.exports = mongoose.model("User", UserSchema);
