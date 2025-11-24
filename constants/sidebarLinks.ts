export interface SidebarLink {
  label: string;
  href?: string;
  icon: string;
  children?: SidebarLink[];
}

export const sidebarLinks: SidebarLink[] = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: "/icons/dashboard.svg",
  },
  {
    label: "Analytics",
    href: "/dashboard/analytics",
    icon: "/icons/analytics.svg",
  },
  {
    label: "User Management",
    icon: "/icons/users.svg",
    children: [
      {
        label: "All Users",
        href: "/dashboard/users",
        icon: "/icons/users.svg",
      },
      {
        label: "Admin Management",
        href: "/dashboard/admins",
        icon: "/icons/users.svg",
      },
    ],
  },
  {
    label: "Transactions",
    href: "/dashboard/transactions",
    icon: "/icons/transactions.svg",
  },
  {
    label: "Virtual Card",
    href: "/dashboard/virtual-card",
    icon: "/icons/virtual-card.svg",
  },
  {
    label: "Rate Management",
    icon: "/icons/rate.svg",
    children: [
      {
        label: "Crypto Rates",
        href: "/dashboard/rate-management/crypto",
        icon: "/icons/rate.svg",
      },
      {
        label: "Giftcard Rates",
        href: "/dashboard/rate-management/giftcard",
        icon: "/icons/rate.svg",
      },
    ],
  },
  {
    label: "Rewards",
    icon: "/icons/rewards.svg",
    href: "/dashboard/rewards",
  },
  {
    label: "Support & Feedback",
    href: "/dashboard/support",
    icon: "/icons/support.svg",
  },
  {
    label: "Giftcards",
    href: "/dashboard/giftcards",
    icon: "/icons/giftcard.svg",
  },
  {
    label: "Notifications",
    href: "/dashboard/notifications",
    icon: "/icons/bell.svg",
  },
  {
    label: "Settings",
    href: "/dashboard/settings",
    icon: "/icons/settings.svg",
  },
];

export const sidebarBottomLinks: SidebarLink[] = [
  {
    label: "Logout",
    icon: "/icons/logout.svg",
  },
];
