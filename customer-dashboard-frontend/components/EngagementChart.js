import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

export default function EngagementChart({ data }) {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 mb-6">
      {/* <h2 className="text-lg font-semibold mb-4">User Engagement Trends</h2> */}
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="dailyActive" stroke="#8884d8" name="DAU" />
          <Line type="monotone" dataKey="weeklyActive" stroke="#82ca9d" name="WAU" />
          <Line type="monotone" dataKey="monthlyActive" stroke="#ffc658" name="MAU" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
