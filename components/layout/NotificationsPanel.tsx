"use client";

import Image from "next/image";
import { FiX } from "react-icons/fi";
import { useMemo } from "react";

import bellScheduled from "@/assets/icons/bell-scheduled.svg";
import noNotifications from "@/assets/icons/no-notifications.svg";

interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
}

export default function NotificationsPanel({
  onClose,
}: {
  onClose: () => void;
}) {
  const notifications: Notification[] = useMemo(
    () => [
      {
        id: "1",
        title: "New giftcard request",
        message: "Imran Rasheed submitted a sell giftcard request.",
        time: "Aug 26 • 10:35am",
      },
      {
        id: "2",
        title: "Admin",
        message: "Hamid approved a sell giftcard request.",
        time: "Aug 26 • 10:20am",
      },
      {
        id: "3",
        title: "Wallet update",
        message: "₦200,000 was added to your wallet.",
        time: "Aug 26 • 9:50am",
      },
      {
        id: "4",
        title: "System message",
        message: "Your profile has been reviewed successfully.",
        time: "Aug 26 • 9:15am",
      },
    ],
    []
  );

  const hasNotifications = notifications.length > 0;

  return (
    <div className="absolute right-2 sm:right-4 top-16 w-[90vw] max-w-[380px] bg-white rounded-xl shadow-xl border border-gray-200 z-50 animate-fade-in">
      <div className="flex items-center justify-between p-4 border-b border-gray-100">
        <h2 className="text-lg font-semibold text-secondary">Notifications</h2>

        <button
          onClick={onClose}
          className="text-gray-500 hover:text-primary transition">
          <FiX size={20} />
        </button>
      </div>

      <div className="max-h-[400px] overflow-y-auto p-3 space-y-4">
        {hasNotifications ? (
          notifications.map((item) => (
            <div
              key={item.id}
              className="flex gap-3 items-start border-b last:border-b-0 border-gray-100 pb-3">
              <Image
                src={bellScheduled}
                width={36}
                height={36}
                alt="Notification icon"
                className="rounded-full shrink-0"
              />

              <div className="flex-1">
                <p className="text-sm text-secondary font-medium">
                  {item.title}
                </p>

                <p className="text-xs text-gray-500 mt-0.5">{item.message}</p>

                <div className="flex justify-between items-center">
                  <p className="text-[11px] text-gray-400 mt-1">{item.time}</p>

                  <button className="text-primary text-xs mt-1 font-semibold hover:underline">
                    Clear
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="py-10 flex flex-col items-center text-center">
            <Image
              alt="No notifications"
              src={noNotifications}
              width={90}
              height={90}
            />
            <p className="mt-3 text-secondary font-medium">No notification</p>
            <p className="text-gray-500 text-sm">
              You don’t have any notifications now.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
