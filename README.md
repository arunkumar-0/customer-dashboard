# customer-dashboard

# 📌 Overview

The Customer Engagement Dashboard is a web application designed to monitor user activity and retention trends. It provides key insights such as daily, weekly, and monthly active users, engagement scores, retention rates, and AI-driven churn predictions.

# ✨ Features

📊 User Engagement Metrics: Tracks daily, weekly, and monthly active users.

📉 Retention Analysis: Provides insights into user retention trends.

🤖 AI Churn Prediction: Identifies users at risk of churn based on engagement scores and activity.

📈 Data Visualization: Displays interactive graphs and tables to analyze user behavior.

🔍 AI Insights: Predicts potential trends in user engagement.

# 🛠️ Tech Stack

Frontend: React.js (Next.js for SSR)

Backend: Node.js, Express.js

Database: MongoDB

State Management: React Hooks

UI Components: Tailwind CSS, Recharts (for data visualization)

# 🚀 Getting Started

**1️⃣ Prerequisites**

Ensure you have the following installed on your system:

Node.js (v14+ recommended)

MongoDB (local or cloud-based like MongoDB Atlas)

Git

**2️⃣ Clone the Repository**

git clone https://github.com/arunkumar-0/customer-dashboard

cd customer-engagement-dashboard

**3️⃣ Install Dependencies**

 **Install backend dependencies**

cd customer-dashboard-backend

npm install

 **Install frontend dependencies**

cd ../customer-dashboard-frontend

npm install

**4️⃣ Set Up Environment Variables**

Create a .env file inside the backend folder and configure the following:

MONGO_URI=mongodb://127.0.0.1:27017/engagementDB

PORT=5000

**5️⃣ Start the Application**

**Start backend server**

cd customer-dashboard-backend

npm start

**Start frontend**

cd ../customer-dashboard-frontend

npm run dev