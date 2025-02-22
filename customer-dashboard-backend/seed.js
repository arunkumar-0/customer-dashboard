const mongoose = require("mongoose");
const User = require("./models/User");
require("dotenv").config();

const mongoURI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/engagementDB";
mongoose.connect(mongoURI)

  .then(async () => {
    console.log("Connected to MongoDB");

  
    await User.deleteMany({});

    // Sample 
    const users = [
      {
        name: "Arun Kumar",
        email: "arun@gmail.com",
        lastLogin: new Date(),
        loginsLast30Days: 28,
        avgSessionTime: 40, 
        actionsLast30Days: 120,
        daysActiveLast30Days: 25,
        engagementScore: 85,
        retentionCategory: "High",
      },
      {
        name: "Rohit",
        email: "rohit@gmail.com",
        lastLogin: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000), 
        loginsLast30Days: 15,
        avgSessionTime: 20,
        actionsLast30Days: 50,
        daysActiveLast30Days: 12,
        engagementScore: 40,
        retentionCategory: "Medium",
      },
      {
        name: "Ritik",
        email: "ritik@gmail.com",
        lastLogin: new Date(Date.now() - 9 * 24 * 60 * 60 * 1000), 
        loginsLast30Days: 8,
        avgSessionTime: 10,
        actionsLast30Days: 15,
        daysActiveLast30Days: 7,
        engagementScore: 20,
        retentionCategory: "Low",
      },
      {
        name: "Dushyant Garg",
        email: "dushyantgarg@gmail.com",
        lastLogin: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000), 
        loginsLast30Days: 20,
        avgSessionTime: 35,
        actionsLast30Days: 80,
        daysActiveLast30Days: 18,
        engagementScore: 70,
        retentionCategory: "Medium",
      },
      {
        name: "Yash Saini",
        email: "yashsaini@gmail.com",
        lastLogin: new Date(),
        loginsLast30Days: 30,
        avgSessionTime: 50,
        actionsLast30Days: 140,
        daysActiveLast30Days: 28,
        engagementScore: 90,
        retentionCategory: "High",
      },
      {
        name: "Harsh",
        email: "harsh@gmail.com",
        lastLogin: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), 
        loginsLast30Days: 5,
        avgSessionTime: 8,
        actionsLast30Days: 10,
        daysActiveLast30Days: 5,
        engagementScore: 10,
        retentionCategory: "Low",
      },
      {
        name: "Rakesh Kumar",
        email: "rakeshrawat@gmail.com",
        lastLogin: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000), 
        loginsLast30Days: 27,
        avgSessionTime: 45,
        actionsLast30Days: 130,
        daysActiveLast30Days: 26,
        engagementScore: 88,
        retentionCategory: "High",
      },
    ];
    
 
    await User.insertMany(users);
    console.log("Mock users inserted");
    mongoose.connection.close();
  })
  .catch(err => console.error("Seeding error:", err));
