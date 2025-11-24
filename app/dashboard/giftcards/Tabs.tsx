"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

export default function Tabs() {
  const pathname = usePathname();

  const tabs = [
    {
      label: "Summary",
      href: "/dashboard/giftcards",
    },
    {
      label: "Giftcards Available to Buy",
      href: "/dashboard/giftcards/available",
    },
  ];

  return (
    <div className="flex gap-6 border-b border-gray-200">
      {tabs.map((tab) => {
        const isActive = pathname === tab.href;

        return (
          <Link
            key={tab.href}
            href={tab.href}
            className={`pb-3 text-sm font-medium transition-colors ${
              isActive
                ? "text-primary border-b-2 border-primary"
                : "text-gray-500 hover:text-gray-700"
            }`}>
            {tab.label}
          </Link>
        );
      })}
    </div>
  );
}
