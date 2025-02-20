const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Customer Engagement Dashboard API");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

const mongoose = require("mongoose");

const mongoURI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/engagementDB";
mongoose.connect(mongoURI)

  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB connection error:", err));


  
const userRoutes = require("./routes/users");
app.use("/users", userRoutes);


const metricsRoutes = require("./routes/metrics");
app.use("/metrics", metricsRoutes);


const predictionRoutes = require("./routes/predictions");
app.use("/predictions", predictionRoutes);
