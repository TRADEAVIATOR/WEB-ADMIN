"use client";

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
  const leaderboard: LeaderboardItem[] = [
    {
      name: "Imran Rosheed",
      score: "$533,094.00",
      status: "+5%",
    },
    {
      name: "Adeola Olanrewaju",
      score: "$320,000.00",
      status: "+3%",
    },
    {
      name: "Rosheed Oyewele",
      score: "$210,000.00",
      status: "+2%",
    },
  ];

  return (
    <div
      className={`bg-white rounded-2xl p-5 flex flex-col border border-gray-100 ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-secondary">{title}</h2>
        <button className="text-sm text-primary hover:underline">
          View all users
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
            { label: "2 Month", value: "2" },
            { label: "6 Month", value: "6" },
          ]}
          className="w-40"
        />
      </div>

      <div className="flex flex-col divide-y divide-gray-200">
        {leaderboard.map((item, idx) => (
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
                <span className="text-xs text-gray-500">Legendary</span>
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
