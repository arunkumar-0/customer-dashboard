import React from "react";

export default function MetricsCard({ metrics }) {
  const cards = [
    { title: "Daily Active Users", value: metrics.dailyActive, color: "bg-blue-500" },
    { title: "Weekly Active Users", value: metrics.weeklyActive, color: "bg-green-500" },
    { title: "Monthly Active Users", value: metrics.monthlyActive, color: "bg-purple-500" },
    { title: "Engagement Score", value: metrics.avgEngagementScore, color: "bg-yellow-500" },
    { title: "Retention Rate", value: `${metrics.retentionRate}`, color: "bg-red-500" },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 gap-5">
      {cards.map((card, index) => (
        <div key={index} className={`${card.color} text-white p-6 rounded-lg shadow-lg`}>
          <h3 className="text-lg font-semibold">{card.title}</h3>
          <p className="text-3xl font-bold mt-2">{card.value}</p>
        </div>
      ))}
    </div>
  );
} 
