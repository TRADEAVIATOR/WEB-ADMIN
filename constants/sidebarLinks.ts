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
    href: "/dashboard/rate-management",
    icon: "/icons/rate.svg",
  },
  {
    label: "Rewards",
    href: "/dashboard/rewards",
    icon: "/icons/rewards.svg",
  },
  {
    label: "Support & Feedback",
    href: "/dashboard/support",
    icon: "/icons/support.svg",
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
