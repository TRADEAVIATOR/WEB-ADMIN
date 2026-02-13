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
        <h1 className="text-2xl md:text-3xl font-semibold text-secondary leading-tight">
          Welcome back,{" "}
          <span className="text-primary inline-flex items-center">
            {userName}

            {isSuperAdmin && (
              <MdVerified
                className="
    ml-2
    text-yellow-400
    text-xl md:text-2xl
    relative top-[2px]
  "
                title="Super Admin"
              />
            )}
          </span>
        </h1>

        <p className="text-gray-500 text-sm md:text-base mt-1">
          Here&apos;s what&apos;s happening today on{" "}
          <span className="font-medium text-secondary">TradeAviator</span>
        </p>
      </div>

      <NgnDisplay rate={ngnRate!} />
    </div>
  );
}
