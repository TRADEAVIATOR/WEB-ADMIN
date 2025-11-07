"use client";

import { useState } from "react";
import Image from "next/image";

export default function HolidayTab() {
  const [activeTab, setActiveTab] = useState<"drafts" | "scheduled">("drafts");

  return (
    <div className="space-y-8">
      <div className="flex justify-center gap-10">
        <button
          onClick={() => setActiveTab("drafts")}
          className={`text-lg font-semibold pb-2 transition cursor-pointer ${
            activeTab === "drafts" ? "text-black" : "text-gray-400"
          }`}>
          Drafts
        </button>
        <button
          onClick={() => setActiveTab("scheduled")}
          className={`text-lg font-semibold pb-2 transition cursor-pointer ${
            activeTab === "scheduled" ? "text-black" : "text-gray-400"
          }`}>
          Scheduled
        </button>
      </div>

      {activeTab === "scheduled" && (
        <div className="divide-y divide-gray-200 space-y-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-start gap-4 pb-4">
              <Image
                src="/icons/bell-scheduled.svg"
                alt="Scheduled Notification"
                width={26}
                height={26}
              />
              <div className="flex-1 space-y-1">
                <h3 className="font-semibold text-lg">Happy Birthday Imran</h3>
                <p className="text-sm text-gray-700 leading-relaxed">
                  Enjoy your day like the king that you are and chop life with
                  TradeAviator
                </p>
                <div className="flex justify-between items-center pt-1">
                  <p className="text-xs text-gray-500">
                    Last edited • Aug 26 • 10:57am
                  </p>
                  <button className="text-primary text-sm font-medium hover:underline">
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === "drafts" && (
        <div className="flex flex-col items-center text-center py-28">
          <Image
            src="/icons/no-notifications.svg"
            alt="No Scheduled Notifications"
            width={140}
            height={140}
          />
          <h3 className="text-xl font-semibold mt-4">No scheduled</h3>
          <p className="text-gray-500 text-sm">
            You don’t have any scheduled notifications for now
          </p>
        </div>
      )}
    </div>
  );
}
