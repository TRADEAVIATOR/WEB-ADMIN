"use client";

import { useState } from "react";
import { AiOutlineArrowUp } from "react-icons/ai";
import { LeaderboardItem } from "@/types/models";
import { LeaderboardCardProps } from "@/types/props";
import AvatarIcon from "@/assets/icons/avatar.svg";
import FormField from "@/components/ui/FormField";
import Image from "next/image";

export default function LeaderboardCard({
  title,
  className,
}: LeaderboardCardProps) {
  const [showAll, setShowAll] = useState(false);

  const leaderboard: LeaderboardItem[] = [
    { name: "Imran Rosheed", score: "$533,094.00", status: "+5.2%" },
    { name: "Adeola Olanrewaju", score: "$417,880.00", status: "+4.1%" },
    { name: "Daniel Okafor", score: "$392,450.00", status: "+3.8%" },
    { name: "Rosheed Oyewele", score: "$310,760.00", status: "+3.2%" },
    { name: "Sarah Williams", score: "$289,140.00", status: "+2.9%" },
    { name: "Michael Zhang", score: "$265,500.00", status: "+2.6%" },
    { name: "Tunde Balogun", score: "$241,980.00", status: "+2.4%" },
    { name: "Aisha Bello", score: "$219,300.00", status: "+2.1%" },
    { name: "David Johnson", score: "$198,750.00", status: "+1.9%" },
    { name: "Fatima Lawal", score: "$176,420.00", status: "+1.6%" },
  ];

  const visibleUsers = showAll ? leaderboard : leaderboard.slice(0, 4);

  return (
    <div
      className={`bg-white rounded-2xl p-5 flex flex-col border border-gray-100 ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-secondary">{title}</h2>
        <button
          onClick={() => setShowAll((prev) => !prev)}
          className="text-sm text-primary hover:underline">
          {showAll ? "Show less" : "View all users"}
        </button>
      </div>

      <div className="flex gap-2 justify-between mb-4">
        <FormField
          as="select"
          options={[
            { label: "Crypto", value: "Crypto" },
            { label: "Giftcard", value: "Giftcard" },
          ]}
          className="w-40"
        />

        <FormField
          as="select"
          options={[
            { label: "2 Months", value: "2" },
            { label: "6 Months", value: "6" },
          ]}
          className="w-40"
        />
      </div>

      <div className="flex flex-col divide-y divide-gray-200">
        {visibleUsers.map((item, idx) => (
          <div key={idx} className="flex items-center justify-between py-3">
            <div className="flex items-center gap-3">
              <Image
                src={AvatarIcon}
                alt={item.name}
                width={40}
                height={40}
                className="rounded-full"
              />
              <div className="flex flex-col">
                <span className="font-medium text-gray-800">{item.name}</span>
                <span className="text-xs text-gray-500">Top Trader</span>
              </div>
            </div>

            <div className="flex flex-col items-end">
              <span className="font-semibold text-gray-900">{item.score}</span>
              <span className="flex items-center text-green-500 text-xs gap-1 mt-1">
                <AiOutlineArrowUp className="w-3 h-3" />
                {item.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
