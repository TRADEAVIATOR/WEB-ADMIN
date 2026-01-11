import Link from "next/link";
import {
  FiSend,
  FiRadio,
  FiCalendar,
  FiFileText,
  FiClock,
  FiBell,
} from "react-icons/fi";
import { getNotificationAnalytics } from "@/lib/api/notifications";
import ResultState from "@/components/ui/ResultState";

type OverviewStats = {
  totalSent: number;
  totalRead: number;
  totalUnread: number;
  readRate: number;
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

export default async function NotificationsPage() {
  const data = await getNotificationAnalytics();

  if (data.error) {
    return (
      <ResultState
        type="error"
        message="Unable to load dashboard data. Please try again."
        showRefresh
      />
    );
  }

  const overview: OverviewStats = data?.data.overview || {
    totalSent: 0,
    totalRead: 0,
    totalUnread: 0,
    readRate: 0,
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Total Sent"
          value={overview.totalSent.toLocaleString()}
          icon={FiSend}
          bgColor="bg-blue-100 text-blue-600"
        />
        <StatsCard
          title="Total Read"
          value={overview.totalRead.toLocaleString()}
          icon={FiClock}
          bgColor="bg-green-100 text-green-600"
        />
        <StatsCard
          title="Unread"
          value={overview.totalUnread.toLocaleString()}
          icon={FiBell}
          bgColor="bg-yellow-100 text-yellow-600"
        />
        <StatsCard
          title="Read Rate"
          value={`${overview.readRate.toFixed(2)}%`}
          icon={FiClock}
          bgColor="bg-purple-100 text-purple-600"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Link href="/dashboard/notifications/all">
          <div className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow cursor-pointer border border-transparent hover:border-primary/30">
            <div className="flex items-start gap-4">
              <div className="bg-primary/10 p-3 rounded-full">
                <FiBell className="text-primary text-xl" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-base">Admin Notifications</h3>
                <p className="text-sm text-gray-500 mt-1">
                  View all system and application-generated alerts
                </p>
              </div>
            </div>
          </div>
        </Link>

        <Link href="/dashboard/notifications/user-specific">
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
      </div>
    </div>
  );
}
