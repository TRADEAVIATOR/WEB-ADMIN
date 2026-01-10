export interface SidebarLink {
  label: string;
  href?: string;
  icon: string;
  children?: SidebarLink[];
}

import DashboardIcon from "@/assets/icons/dashboard.svg";
import AnalyticsIcon from "@/assets/icons/analytics.svg";
import UsersIcon from "@/assets/icons/users.svg";
import TicketsIcon from "@/assets/icons/tickets.svg";
import EventsIcon from "@/assets/icons/events.svg";
import TagIcon from "@/assets/icons/taglines.svg";
import DisputesIcon from "@/assets/icons/disputes.svg";
import TransactionsIcon from "@/assets/icons/transactions.svg";
import VirtualCardIcon from "@/assets/icons/virtual-card.svg";
import RateIcon from "@/assets/icons/rate.svg";
import RewardsIcon from "@/assets/icons/rewards.svg";
import SupportIcon from "@/assets/icons/support.svg";
import GiftcardIcon from "@/assets/icons/giftcard.svg";
import BellIcon from "@/assets/icons/bell.svg";
import SettingsIcon from "@/assets/icons/settings.svg";
import LogoutIcon from "@/assets/icons/logout.svg";

export const sidebarLinks: SidebarLink[] = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: DashboardIcon,
  },
  {
    label: "Analytics",
    href: "/dashboard/analytics",
    icon: AnalyticsIcon,
  },
  {
    label: "User Management",
    icon: UsersIcon,
    children: [
      {
        label: "All Users",
        href: "/dashboard/users",
        icon: UsersIcon,
      },
      {
        label: "Admin Management",
        href: "/dashboard/admins",
        icon: UsersIcon,
      },
    ],
  },
  {
    label: "Tickets",
    href: "/dashboard/tickets",
    icon: TicketsIcon,
  },
  {
    label: "Events",
    href: "/dashboard/events",
    icon: EventsIcon,
  },
  {
    label: "Taglines",
    href: "/dashboard/taglines",
    icon: TagIcon,
  },
  {
    label: "Disputes",
    href: "/dashboard/disputes",
    icon: DisputesIcon,
  },
  {
    label: "Transactions",
    href: "/dashboard/transactions",
    icon: TransactionsIcon,
  },
  {
    label: "Virtual Card",
    href: "/dashboard/virtual-card",
    icon: VirtualCardIcon,
  },
  {
    label: "Rate Management",
    icon: RateIcon,
    children: [
      {
        label: "Crypto Rates",
        href: "/dashboard/rate-management/crypto",
        icon: RateIcon,
      },
      {
        label: "Giftcard Rates",
        href: "/dashboard/giftcards/sell/accepted",
        icon: RateIcon,
      },
    ],
  },
  {
    label: "Rewards",
    href: "/dashboard/rewards",
    icon: RewardsIcon,
  },
  {
    label: "Support & Feedback",
    href: "/dashboard/support",
    icon: SupportIcon,
  },
  {
    label: "Giftcards",
    icon: GiftcardIcon,
    children: [
      {
        label: "Buy",
        href: "/dashboard/giftcards/buy/orders",
        icon: GiftcardIcon,
      },
      {
        label: "Sell",
        href: "/dashboard/giftcards/sell/sales",
        icon: GiftcardIcon,
      },
    ],
  },
  {
    label: "Notifications",
    href: "/dashboard/notifications",
    icon: BellIcon,
  },
  {
    label: "Settings",
    href: "/dashboard/profile",
    icon: SettingsIcon,
  },
  {
    label: "Admin Notifications",
    href: "/dashboard/admin-notifications",
    icon: BellIcon,
  },
];

export const sidebarBottomLinks: SidebarLink[] = [
  {
    label: "Logout",
    icon: LogoutIcon,
  },
];
