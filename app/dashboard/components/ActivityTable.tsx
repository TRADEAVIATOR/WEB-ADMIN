"use client";

import { RecentActivitiesProps } from "@/types/props";

export default function RecentActivities({
  title = "Recent Activities",
  data,
  className,
}: RecentActivitiesProps) {
  return (
    <div
      className={`bg-white rounded-2xl p-6 flex flex-col gap-4 border border-gray-100 ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-secondary">{title}</h2>
        <button className="text-sm text-primary hover:underline">
          See all
        </button>
      </div>

      <div className="flex flex-col divide-y divide-gray-200">
        {data.map((activity) => (
          <div
            key={activity.id}
            className="flex flex-col sm:flex-row sm:items-center sm:justify-between py-3">
            <div className="flex flex-col gap-0.5">
              <p className="text-sm font-medium text-gray-800">
                {activity.description}
              </p>
              <p className="text-sm text-gray-500">{activity.details}</p>
            </div>
            <p className="text-xs text-gray-400 mt-1 sm:mt-0">
              {activity.time}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
