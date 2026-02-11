"use client";

import Image from "next/image";
import { FiX } from "react-icons/fi";
import { useEffect, useRef, useState } from "react";
import bellScheduled from "@/assets/icons/bell-scheduled.svg";
import noNotifications from "@/assets/icons/no-notifications.svg";
import {
  getAdminNotificationsClient,
  markNotificationAsRead,
} from "@/lib/api/notifications";
import { handleApiError } from "@/lib/utils/errorHandler";
import toast from "react-hot-toast";

interface Notification {
  id: string;
  title: string;
  message: string;
  createdAt: string;
  isRead: boolean;
  priority?: "high" | "medium" | "low";
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
        if (res?.data) setNotifications(res.data);
        else setError(true);
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  const handleMarkRead = async (id: string) => {
    const toastId = toast.loading("Marking notification as read...");

    try {
      await markNotificationAsRead(id);

      setNotifications((prev) =>
        prev.map((n) => (n.id === id ? { ...n, isRead: true } : n)),
      );

      toast.success("Notification marked as read", { id: toastId });
    } catch (error) {
      toast.error("Failed to mark notification", { id: toastId });
      handleApiError(error);
    }
  };

  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        panelRef.current &&
        !panelRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  return (
    <div
      ref={panelRef}
      className="absolute right-2 sm:right-4 top-16 w-[90vw] max-w-[380px] bg-white rounded-xl shadow-xl border border-gray-200 z-50">
      <div className="flex items-center justify-between p-4 border-b border-gray-100">
        <h2 className="text-base font-semibold text-secondary">
          Notifications
        </h2>
        <button onClick={onClose} className="text-gray-500 hover:text-primary">
          <FiX size={18} />
        </button>
      </div>

      <div className="max-h-[420px] overflow-y-auto p-3 space-y-3">
        {loading && (
          <p className="text-center text-gray-400 py-10">
            Loading notifications...
          </p>
        )}

        {error && !loading && (
          <p className="text-center text-red-500 py-10">
            Failed to load notifications
          </p>
        )}

        {!loading && !error && notifications.length === 0 && (
          <div className="py-10 flex flex-col items-center text-center">
            <Image src={noNotifications} width={90} height={90} alt="" />
            <p className="mt-3 font-medium text-secondary">No notifications</p>
          </div>
        )}

        {!loading &&
          !error &&
          notifications.map((item) => (
            <div
              key={item.id}
              className={`relative rounded-lg p-3 border transition ${
                item.isRead
                  ? "bg-white border-gray-100"
                  : "bg-primary/5 border-primary/20"
              }`}>
              {!item.isRead && (
                <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-primary" />
              )}

              <div className="flex gap-3">
                <Image
                  src={bellScheduled}
                  width={36}
                  height={36}
                  alt=""
                  className="shrink-0"
                />

                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <p className="text-sm font-medium text-secondary">
                      {item.title}
                    </p>

                    {item.priority && (
                      <span
                        className={`text-[10px] px-2 py-0.5 rounded-full ${
                          item.priority === "high"
                            ? "bg-red-50 text-red-600"
                            : "bg-yellow-50 text-yellow-700"
                        }`}>
                        {item.priority}
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-gray-600 mt-1">{item.message}</p>

                  <div className="flex justify-between items-center mt-2">
                    <p className="text-[11px] text-gray-400">
                      {new Date(item.createdAt).toLocaleString()}
                    </p>

                    {!item.isRead && (
                      <button
                        onClick={() => handleMarkRead(item.id)}
                        className="text-primary text-xs font-medium hover:underline">
                        Mark read
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}

        {!loading && !error && notifications.length > 0 && (
          <a
            href="/dashboard/admin-notifications"
            className="block pt-2 text-center text-sm text-primary font-medium hover:underline">
            View all notifications
          </a>
        )}
      </div>
    </div>
  );
}
