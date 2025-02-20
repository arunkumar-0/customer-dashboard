import React from "react";

export default function AIInsights({ predictions }) {
  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <h2 className="text-lg font-semibold mb-4">AI-Powered Insights</h2>
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2">Name</th>
            <th className="p-2">Email</th>
            <th className="p-2">Engagement Score</th>
            <th className="p-2">Churn Risk</th>
          </tr>
        </thead>
        <tbody>
          {predictions.map((user) => (
            <tr key={user.email} className="border-t">
              <td className="p-2">{user.name}</td>
              <td className="p-2">{user.email}</td>
              <td className="p-2">{user.engagementScore}</td>
              <td className="p-2">{user.churnRisk}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
