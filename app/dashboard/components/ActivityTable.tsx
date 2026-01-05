"use client";

import { useModal } from "@/context/ModalContext";
import { RecentActivitiesProps } from "@/types/props";
import clsx from "clsx";

export default function RecentActivities({
  title = "Recent Activities",
  data,
  className,
}: RecentActivitiesProps) {
  const { openModal } = useModal();

  const truncate = (text: string, maxLength = 25) =>
    text.length > maxLength ? text.slice(0, maxLength) + "…" : text;

  const parseBackendDate = (value: string) => {
    const [datePart, timePart] = value.split(", ");
    const [day, month, year] = datePart.split("/");

    return new Date(`${year}-${month}-${day}T${timePart}`);
  };

  return (
    <div
      className={clsx(
        "bg-white rounded-2xl p-6 flex flex-col gap-4 border border-gray-100",
        className
      )}>
      <h2 className="text-lg font-semibold text-secondary mb-4">{title}</h2>

      <div className="flex flex-col divide-y divide-gray-200">
        {data.slice(0, 8).map((activity) => (
          <button
            key={activity.id}
            onClick={() => openModal("view-activity-details", activity)}
            className="text-left w-full flex flex-col sm:flex-row sm:items-center sm:justify-between py-3 hover:bg-gray-50 transition rounded-lg px-2">
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
          </button>
        ))}
      </div>
    </div>
  );
}
