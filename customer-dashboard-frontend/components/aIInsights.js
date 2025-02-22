import React from "react";

export default function AIInsights({ predictions }) {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 w-full">
      <h2 className="text-lg font-semibold mb-4">AI-Powered Insights</h2>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-2 border border-gray-300 text-left">Name</th>
              <th className="px-4 py-2 border border-gray-300 text-left">Email</th>
              <th className="px-4 py-2 border border-gray-300 text-center">Engagement Score</th>
              <th className="px-4 py-2 border border-gray-300 text-center">Churn Risk</th>
            </tr>
          </thead>
          <tbody>
            {predictions.map((user, index) => (
              <tr key={user.email} className={`${index % 2 === 0 ? "bg-gray-100" : "bg-white"} border-t`}>
                <td className="px-4 py-2 border border-gray-300">{user.name}</td>
                <td className="px-4 py-2 border border-gray-300">{user.email}</td>
                <td className="px-4 py-2 border border-gray-300 text-center">{user.engagementScore}</td>
                <td className="px-4 py-2 border border-gray-300 text-center">{user.churnRisk}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
