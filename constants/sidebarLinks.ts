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
    label: "User Management",
    icon: "/icons/users.svg",
    children: [
      {
        label: "All Users",
        href: "/users",
        icon: "/icons/users.svg",
      },
      {
        label: "Admin Management",
        href: "/admins",
        icon: "/icons/users.svg",
      },
    ],
  },
  {
    label: "Transactions",
    href: "/transactions",
    icon: "/icons/transactions.svg",
  },
  {
    label: "Virtual Card",
    href: "/virtual-card",
    icon: "/icons/virtual-card.svg",
  },
  {
    label: "Rate Management",
    href: "/rate-management",
    icon: "/icons/rate.svg",
  },
  {
    label: "Rewards",
    href: "/rewards",
    icon: "/icons/rewards.svg",
  },
  {
    label: "Support & Feedback",
    href: "/support",
    icon: "/icons/support.svg",
  },
  {
    label: "Settings",
    href: "/settings",
    icon: "/icons/settings.svg",
  },
];

export const sidebarBottomLinks: SidebarLink[] = [
  {
    label: "Logout",
    href: "/logout",
    icon: "/icons/logout.svg",
  },
];
