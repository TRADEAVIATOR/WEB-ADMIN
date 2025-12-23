"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  FiSend,
  FiRadio,
  FiCalendar,
  FiFileText,
  FiClock,
  FiBell,
} from "react-icons/fi";

type Stats = {
  totalSent: number;
  totalRead: number;
  readRate: number;
  pending: number;
};

function StatsCard({
  title,
  value,
  icon: Icon,
  bgColor,
}: {
  title: string;
  value: string | number;
  icon: any;
  bgColor: string;
}) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500">{title}</p>
          <p className="text-2xl font-bold mt-1">{value}</p>
        </div>
        <div className={`${bgColor} p-3 rounded-full`}>
          <Icon className="text-xl" />
        </div>
      </div>
    </div>
  );
}

export default function NotificationsPage() {
  const [stats, setStats] = useState<Stats>({
    totalSent: 0,
    totalRead: 0,
    readRate: 0,
    pending: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStats = async () => {
      setLoading(true);
      // TODO: Replace with actual API call
      // const api = await authApi();
      // const res = await tryServer(api.get('/api/v1/admin/notifications/analytics'));
      setStats({
        totalSent: 1250,
        totalRead: 890,
        readRate: 71.2,
        pending: 8,
      });
      setLoading(false);
    };
    loadStats();
  }, []);

  return (
    <div className="space-y-6">
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="bg-white rounded-lg shadow-sm p-6 animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-20 mb-2"></div>
              <div className="h-8 bg-gray-200 rounded w-16"></div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatsCard
            title="Total Sent"
            value={stats.totalSent.toLocaleString()}
            icon={FiSend}
            bgColor="bg-blue-100 text-blue-600"
          />
          <StatsCard
            title="Total Read"
            value={stats.totalRead.toLocaleString()}
            icon={FiClock}
            bgColor="bg-green-100 text-green-600"
          />
          <StatsCard
            title="Read Rate"
            value={`${stats.readRate}%`}
            icon={FiBell}
            bgColor="bg-yellow-100 text-yellow-600"
          />
          <StatsCard
            title="Pending"
            value={stats.pending}
            icon={FiClock}
            bgColor="bg-purple-100 text-purple-600"
          />
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Link href="/dashboard/notifications/all">
          <div className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow cursor-pointer border border-transparent hover:border-primary/30">
            <div className="flex items-start gap-4">
              <div className="bg-primary/10 p-3 rounded-full">
                <FiSend className="text-primary text-xl" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-base">Send Notification</h3>
                <p className="text-sm text-gray-500 mt-1">
                  Send targeted notifications to specific users
                </p>
              </div>
            </div>
          </div>
        </Link>

        <Link href="/dashboard/notifications/broadcast">
          <div className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow cursor-pointer border border-transparent hover:border-primary/30">
            <div className="flex items-start gap-4">
              <div className="bg-primary/10 p-3 rounded-full">
                <FiRadio className="text-primary text-xl" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-base">Broadcast</h3>
                <p className="text-sm text-gray-500 mt-1">
                  Send notifications to all or filtered users
                </p>
              </div>
            </div>
          </div>
        </Link>

        <Link href="/dashboard/notifications/scheduled">
          <div className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow cursor-pointer border border-transparent hover:border-primary/30">
            <div className="flex items-start gap-4">
              <div className="bg-primary/10 p-3 rounded-full">
                <FiCalendar className="text-primary text-xl" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-base">Schedule</h3>
                <p className="text-sm text-gray-500 mt-1">
                  Schedule notifications for later delivery
                </p>
              </div>
            </div>
          </div>
        </Link>

        <Link href="/dashboard/notifications/templates">
          <div className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow cursor-pointer border border-transparent hover:border-primary/30">
            <div className="flex items-start gap-4">
              <div className="bg-primary/10 p-3 rounded-full">
                <FiFileText className="text-primary text-xl" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-base">Templates</h3>
                <p className="text-sm text-gray-500 mt-1">
                  Manage reusable notification templates
                </p>
              </div>
            </div>
          </div>
        </Link>

        <Link href="/dashboard/notifications/history">
          <div className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow cursor-pointer border border-transparent hover:border-primary/30">
            <div className="flex items-start gap-4">
              <div className="bg-primary/10 p-3 rounded-full">
                <FiClock className="text-primary text-xl" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-base">History</h3>
                <p className="text-sm text-gray-500 mt-1">
                  View all sent notifications and analytics
                </p>
              </div>
            </div>
          </div>
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
        <div className="space-y-4">
          <div className="flex items-start gap-3 p-4 bg-[#F5F5F5] rounded-lg">
            <div className="bg-green-100 p-2 rounded-full">
              <FiBell className="text-green-600" />
            </div>
            <div className="flex-1">
              <p className="font-medium text-sm">Broadcast sent successfully</p>
              <p className="text-xs text-gray-500 mt-1">
                5,420 recipients • 2 hours ago
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-4 bg-[#F5F5F5] rounded-lg">
            <div className="bg-blue-100 p-2 rounded-full">
              <FiCalendar className="text-blue-600" />
            </div>
            <div className="flex-1">
              <p className="font-medium text-sm">Notification scheduled</p>
              <p className="text-xs text-gray-500 mt-1">Dec 20, 10:00 AM</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
