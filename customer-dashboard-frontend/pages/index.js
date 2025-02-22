import React, { useEffect, useState } from "react";
import axios from "axios";
import MetricsCard from "../components/metricsCard";
import UserTable from "../components/userTable";
import AIInsights from "../components/aIInsights";
import EngagementChart from "../components/EngagementChart";
import Layout from "../components/Layout";

export default function Dashboard() {
  const [metrics, setMetrics] = useState(null);
  const [users, setUsers] = useState([]);
  const [predictions, setPredictions] = useState([]);
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/metrics")
      .then((res) => {
        setMetrics(res.data);
        console.log("Metrics Data:", res.data);
  
        const { dailyActive, weeklyActive, monthlyActive, retentionRate } = res.data;
  
        // data dynamically for the last 30 days
        const days = 30;
        const dynamicChartData = Array.from({ length: days }, (_, i) => ({
          date: `Day ${i + 1}`,
          dailyActive: Math.max(dailyActive - i % 5, 0),
          weeklyActive: Math.max(weeklyActive - (i % 7), 0),
          monthlyActive: Math.max(monthlyActive - (i % 10), 0),
          retention: Math.max(retentionRate - i % 3, 0),
        }));
  
        setChartData(dynamicChartData);
      })
      .catch((err) => console.error("Error fetching metrics:", err));
  
    axios.get("http://localhost:5000/users")
      .then((res) => setUsers(res.data))
      .catch((err) => console.error("Error fetching users:", err));
  
    axios.get("http://localhost:5000/predictions")
      .then((res) => setPredictions(res.data))
      .catch((err) => console.error("Error fetching predictions:", err));
  }, []);
  
  return (
    <Layout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-gray-800">Customer Engagement Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {metrics && <MetricsCard metrics={metrics} />}
        </div>

        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-lg font-semibold mb-4">User Engagement Trends</h2>
          <EngagementChart data={chartData} />
        </div>

        <div className="bg-white shadow-md rounded-lg p-6">
          <UserTable users={users} />
        </div>

        <div className="bg-white shadow-md rounded-lg p-6">
          <AIInsights predictions={predictions} />
        </div>
      </div>
    </Layout>
  );
}
