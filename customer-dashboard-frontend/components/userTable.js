import React, { useState } from "react";

export default function UserTable({ users }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [minEngagement, setMinEngagement] = useState("");
  const [retentionFilter, setRetentionFilter] = useState("");

  //  users based on search & filters
  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesEngagement = minEngagement
      ? user.engagementScore >= parseInt(minEngagement)
      : true;

    const matchesRetention =
      retentionFilter === "" || user.retentionCategory === retentionFilter;

    return matchesSearch && matchesEngagement && matchesRetention;
  });

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4">User Activity</h2>

     
      <div className="flex flex-col md:flex-row md:space-x-4 space-y-3 md:space-y-0 mb-4">
        <input
          type="text"
          placeholder="🔍 Search by Name or Email..."
          className="w-full md:w-1/3 p-2 border rounded-lg"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        <input
          type="number"
          placeholder="📊 Min Engagement Score"
          className="w-full md:w-1/4 p-2 border rounded-lg"
          value={minEngagement}
          onChange={(e) => setMinEngagement(e.target.value)}
        />

        <select
          className="w-full md:w-1/4 p-2 border rounded-lg"
          value={retentionFilter}
          onChange={(e) => setRetentionFilter(e.target.value)}
        >
          <option value="">All Retention Levels</option>
          <option value="High">🔥 High</option>
          <option value="Medium">⚡ Medium</option>
          <option value="Low">🛑 Low</option>
        </select>
      </div>

    
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-200">
          <thead className="bg-blue-500 text-white">
            <tr>
              <th className="p-3 text-left">👤 Name</th>
              <th className="p-3 text-left">📧 Email</th>
              <th className="p-3 text-center">📅 Last Login</th>
              <th className="p-3 text-center">📊 Engagement Score</th>
              <th className="p-3 text-center">🔮 Retention</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user, index) => (
              <tr
                key={index}
                className="border-t hover:bg-gray-100 transition duration-200"
              >
                <td className="p-3">{user.name}</td>
                <td className="p-3">{user.email}</td>
                <td className="p-3 text-center">{user.lastLogin}</td>
                <td className="p-3 text-center font-semibold">
                  {user.engagementScore}
                </td>
                <td
                  className={`p-3 text-center font-bold ${
                    user.retentionCategory === "High"
                      ? "text-green-500"
                      : user.retentionCategory === "Medium"
                      ? "text-yellow-500"
                      : "text-red-500"
                  }`}
                >
                  {user.retentionCategory}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
