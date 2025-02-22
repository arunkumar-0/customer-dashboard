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
      { name: "Arun Kumar", email: "arun@gmail.com", lastLogin: new Date(), engagementScore: 85, retentionCategory: "High" },
      { name: "Rohit", email: "rohit@gmail.com", lastLogin: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000), engagementScore: 40, retentionCategory: "Medium" }, // Last login 6 days ago (-6 daily)
      { name: "Ritik", email: "ritik@gmail.com", lastLogin: new Date(Date.now() - 9 * 24 * 60 * 60 * 1000), engagementScore: 20, retentionCategory: "Low" }, // Last login 9 days ago (-9 weekly)
      { name: "Dushyant Garg", email: "dushyantgarg@gmail.com", lastLogin: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000), engagementScore: 70, retentionCategory: "Low" }, // Last login 10 days ago (-10 monthly)
      { name: "Yash Saini", email: "yashsaini@gmail.com", lastLogin: new Date(), engagementScore: 90, retentionCategory: "High" },
      { name: "Harsh", email: "harsh@gmail.com", lastLogin: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), engagementScore: 10, retentionCategory: "Medium" }, // Last login 7 days ago
      { name: "Rakesh Kumar", email: "rakeshrawat@gmail.com", lastLogin: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000), engagementScore: 88, retentionCategory: "High" }, // Last login 8 days ago
    ];
    
    await User.insertMany(users);
    console.log("Mock users inserted");
    mongoose.connection.close();
  })
  .catch(err => console.error("Seeding error:", err));
