"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

export interface TabItem {
  label: string;
  href: string;
}

interface TabsProps {
  tabs: TabItem[];
  basePath?: string;
}

export default function Tabs({ tabs, basePath = "" }: TabsProps) {
  const pathname = usePathname();

  return (
    <div className="flex gap-6 border-b border-gray-200">
      {tabs.map((tab) => {
        const isActive = pathname === `${basePath}${tab.href}`;

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
