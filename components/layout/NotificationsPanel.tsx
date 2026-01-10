"use client";

import Image from "next/image";
import { FiX } from "react-icons/fi";
import { useEffect, useState } from "react";
import bellScheduled from "@/assets/icons/bell-scheduled.svg";
import noNotifications from "@/assets/icons/no-notifications.svg";
import {
  getAdminNotificationsClient,
  markNotificationAsRead,
} from "@/lib/api/notifications";
import { handleApiError } from "@/lib/utils/errorHandler";

interface Notification {
  id: string;
  title: string;
  message: string;
  createdAt: string;
  isRead: boolean;
}

export default function NotificationsPanel({
  onClose,
}: {
  onClose: () => void;
}) {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    getAdminNotificationsClient(5)
      .then((res) => {
        if (res?.success) {
          setNotifications(res.data || []);
        } else {
          setError(true);
        }
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  const handleMarkRead = async (id: string) => {
    try {
      await markNotificationAsRead(id);
      setNotifications((prev) =>
        prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
      );
    } catch (error) {
      handleApiError(error);
    }
  };

  return (
    <div className="absolute right-2 sm:right-4 top-16 w-[90vw] max-w-[380px] bg-white rounded-xl shadow-lg border border-gray-200 z-50 animate-fade-in">
      <div className="flex items-center justify-between p-4 border-b border-gray-100">
        <h2 className="text-lg font-semibold text-secondary">Notifications</h2>
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-primary transition-colors">
          <FiX size={20} />
        </button>
      </div>

      <div className="max-h-[400px] overflow-y-auto p-3 flex flex-col gap-4">
        {loading && (
          <p className="text-center text-gray-400 py-10">
            Loading notifications...
          </p>
        )}

        {error && !loading && (
          <p className="text-center text-red-500 py-10">
            Failed to load notifications. Please try again.
          </p>
        )}

        {!loading && !error && notifications.length === 0 && (
          <div className="py-10 flex flex-col items-center text-center">
            <Image
              alt="No notifications"
              src={noNotifications}
              width={90}
              height={90}
            />
            <p className="mt-3 text-secondary font-medium">No notifications</p>
            <p className="text-gray-500 text-sm">
              You don’t have any notifications now.
            </p>
          </div>
        )}

        {!loading &&
          !error &&
          notifications.map((item) => (
            <div
              key={item.id}
              className={`flex gap-3 items-start border-b last:border-b-0 border-gray-100 pb-3 pt-2 px-1 rounded-md ${
                item.isRead ? "opacity-70" : "bg-gray-50"
              }`}>
              <Image
                src={bellScheduled}
                width={36}
                height={36}
                alt="Notification icon"
                className="rounded-full shrink-0"
              />
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <p className="text-sm text-secondary font-medium">
                    {item.title}
                  </p>
                  <p className="text-xs text-gray-500 mt-0.5">{item.message}</p>
                </div>
                <div className="flex justify-between items-center mt-1">
                  <p className="text-[11px] text-gray-400">
                    {new Date(item.createdAt).toLocaleString([], {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                      hour: "numeric",
                      minute: "2-digit",
                      hour12: true,
                    })}
                  </p>
                  {!item.isRead && (
                    <button
                      onClick={() => handleMarkRead(item.id)}
                      className="text-primary text-xs font-semibold hover:underline">
                      Mark read
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}

        {!loading && !error && notifications.length > 0 && (
          <a
            href="/dashboard/admin-notifications"
            className="mt-2 text-center text-sm text-primary font-medium hover:underline">
            View All Notifications
          </a>
        )}
      </div>
    </div>
  );
}
