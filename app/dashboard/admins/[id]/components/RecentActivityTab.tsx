"use client";

export default function RecentActivityTab() {
  const activities = [
    {
      timestamp: "Sept 7, 2025 - 12:24PM",
      activity: "Access created",
    },
    {
      timestamp: "Sept 7, 2025 - 12:24PM",
      activity: "Logged in to the system",
    },
    {
      timestamp: "Sept 7, 2025 - 12:24PM",
      activity: "Reset password",
    },
  ];

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full text-sm border border-gray-100 rounded-lg">
        <thead className="bg-gray-50 text-gray-600">
          <tr>
            <th className="text-left py-3 px-4 font-medium">Timestamp</th>
            <th className="text-left py-3 px-4 font-medium">Activity</th>
          </tr>
        </thead>
        <tbody>
          {activities.map((item, index) => (
            <tr
              key={index}
              className="border-t border-gray-100 hover:bg-gray-50 transition">
              <td className="py-3 px-4">{item.timestamp}</td>
              <td className="py-3 px-4">{item.activity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
