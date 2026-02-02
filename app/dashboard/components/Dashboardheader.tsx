"use client";

import NgnDisplay from "./NgnDisplay";

interface DashboardHeaderProps {
  userName: string;
  ngnRate: number | null;
}

export default function DashboardHeader({
  userName,
  ngnRate,
}: DashboardHeaderProps) {
  return (
    <div className="flex items-start md:items-center justify-between gap-4 flex-col md:flex-row">
      <div>
        <h1 className="text-2xl md:text-3xl font-semibold text-secondary">
          Welcome back, <span className="text-primary">{userName}</span>
        </h1>
        <p className="text-gray-500 text-sm md:text-base">
          Here&apos;s what&apos;s happening today on{" "}
          <span className="font-medium text-secondary">TradeAviator</span>
        </p>
      </div>

      <NgnDisplay rate={ngnRate!} />
    </div>
  );
}
