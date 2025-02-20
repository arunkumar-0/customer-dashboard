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
    axios.get("http://localhost:5000/metrics").then((res) => {
      setMetrics(res.data);

      // Prepare mock data for the chart
      setChartData([
        { date: "Day 1", dailyActive: res.data.dailyActive, weeklyActive: res.data.weeklyActive, monthlyActive: res.data.monthlyActive },
        { date: "Day 2", dailyActive: res.data.dailyActive - 5, weeklyActive: res.data.weeklyActive - 10, monthlyActive: res.data.monthlyActive - 20 },
        { date: "Day 3", dailyActive: res.data.dailyActive + 2, weeklyActive: res.data.weeklyActive - 5, monthlyActive: res.data.monthlyActive - 15 },
        { date: "Day 4", dailyActive: res.data.dailyActive + 8, weeklyActive: res.data.weeklyActive - 3, monthlyActive: res.data.monthlyActive - 10 },
      ]);
    });

    axios.get("http://localhost:5000/users").then((res) => setUsers(res.data));
    axios.get("http://localhost:5000/predictions").then((res) => setPredictions(res.data));
  }, []);

  return (
    <Layout>
      <div className="space-y-6">
        {/* Dashboard Header */}
        <h1 className="text-3xl font-bold text-gray-800">Customer Engagement Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
  {/* Metrics Section */}
  {metrics && <MetricsCard metrics={metrics} />}
</div>

{/* Engagement Chart */}
<div className="bg-white shadow-md rounded-lg p-6">
  <h2 className="text-lg font-semibold mb-4">User Engagement Trends</h2>
  <EngagementChart data={chartData} />
</div>

{/* User Table */}
<div className="bg-white shadow-md rounded-lg p-6">
  <UserTable users={users} />
</div>

{/* AI Insights */}
<div className="bg-white shadow-md rounded-lg p-6">
  <AIInsights predictions={predictions} />
</div>
</div>
    </Layout>
  );
}
