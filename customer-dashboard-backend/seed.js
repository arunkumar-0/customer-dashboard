const mongoose = require("mongoose");
const User = require("./models/User");
require("dotenv").config();

const mongoURI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/engagementDB";
mongoose.connect(mongoURI)

  .then(async () => {
    console.log("Connected to MongoDB");

    // Delete existing users
    await User.deleteMany({});

    // Sample users
    const users = [
      { name: "Alice Johnson", email: "alice@example.com", lastLogin: new Date(), engagementScore: 85, retentionCategory: "High" },
      { name: "Bob Smith", email: "bob@example.com", lastLogin: new Date(), engagementScore: 40, retentionCategory: "Medium" },
      { name: "Charlie Brown", email: "charlie@example.com", lastLogin: new Date(), engagementScore: 20, retentionCategory: "Low" }
    ];

    await User.insertMany(users);
    console.log("Mock users inserted");
    mongoose.connection.close();
  })
  .catch(err => console.error("Seeding error:", err));
