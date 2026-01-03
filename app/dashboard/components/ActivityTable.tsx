"use client";

import { useState } from "react";
import { RecentActivitiesProps } from "@/types/props";
import clsx from "clsx";

export default function RecentActivities({
  title = "Recent Activities",
  data,
  className,
}: RecentActivitiesProps) {
  const [showAll, setShowAll] = useState(false);

  const truncate = (text: string, maxLength = 25) =>
    text.length > maxLength ? text.slice(0, maxLength) + "…" : text;

  const parseBackendDate = (value: string) => {
    const [datePart, timePart] = value.split(", ");
    const [day, month, year] = datePart.split("/");

    return new Date(`${year}-${month}-${day}T${timePart}`);
  };

  const visibleActivities = showAll ? data : data.slice(0, 5);

  return (
    <div
      className={clsx(
        "bg-white rounded-2xl p-6 flex flex-col gap-4 border border-gray-100",
        className
      )}>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-secondary">{title}</h2>
        {data.length > 5 && (
          <button
            onClick={() => setShowAll((prev) => !prev)}
            className="text-sm text-primary hover:underline">
            {showAll ? "Show less" : "See all"}
          </button>
        )}
      </div>

      <div className="flex flex-col divide-y divide-gray-200">
        {visibleActivities.map((activity) => (
          <div
            key={activity.id}
            className="w-full flex flex-col sm:flex-row sm:items-center sm:justify-between py-3 rounded-lg px-2 hover:bg-gray-50 transition">
            <div className="flex flex-col gap-0.5">
              <p className="text-sm font-medium text-gray-800">
                {truncate(activity.description)}
              </p>
              <p className="text-sm text-gray-500">
                {truncate(
                  `${activity.type} - ${
                    activity.amount
                  } ${activity.currency.toUpperCase()}`,
                  30
                )}
              </p>
            </div>
            <div className="flex flex-col sm:items-end text-right">
              <p className="text-xs text-gray-400">{activity.timeAgo}</p>
              <p className="text-xs text-gray-400">
                {parseBackendDate(activity.createdAt).toLocaleString([], {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                  hour: "numeric",
                  minute: "2-digit",
                  hour12: true,
                })}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
