"use client";

import { MdVerified } from "react-icons/md";
import NgnDisplay from "./NgnDisplay";

interface DashboardHeaderProps {
  userName: string;
  ngnRate: number | null;
  isSuperAdmin: boolean;
}

export default function DashboardHeader({
  userName,
  ngnRate,
  isSuperAdmin,
}: DashboardHeaderProps) {
  return (
    <div className="flex items-start md:items-center justify-between gap-4 flex-col md:flex-row">
      <div>
        <h1 className="text-2xl md:text-3xl font-semibold text-secondary flex items-center gap-2 flex-wrap">
          Welcome back,{" "}
          <span className="text-primary flex items-center gap-2">
            {userName}

            {isSuperAdmin && (
              <span
                className="flex items-center justify-center w-6 h-6 rounded-full 
                           bg-gradient-to-br from-yellow-400 via-amber-500 to-yellow-600
                           shadow-md ring-1 ring-yellow-300/40"
                title="Super Admin">
                <MdVerified className="text-white text-sm" />
              </span>
            )}
          </span>
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
