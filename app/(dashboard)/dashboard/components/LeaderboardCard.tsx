"use client";

import Select from "@/components/ui/Select";
import { AiOutlineArrowUp } from "react-icons/ai";
import Image from "next/image";

interface LeaderboardCardProps {
  title: string;
  className?: string;
}

interface LeaderboardItem {
  name: string;
  score: string;
  status: string;
}

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
      className={`bg-white rounded-xl shadow-sm p-5 flex flex-col gap-4 ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-secondary">{title}</h2>
        <button className="text-sm text-primary hover:underline">
          View all users
        </button>
      </div>

      <div className="flex gap-2 justify-between mb-4">
        <Select options={["Crypto", "Giftcard"]} />
        <Select options={["2 Month", "6 Month"]} />
      </div>

      <div className="flex flex-col divide-y divide-gray-200">
        {leaderboard.map((item, idx) => (
          <div key={idx} className="flex items-center justify-between py-3">
            <div className="flex items-center gap-3">
              <Image
                src={"/icons/avatar.svg"}
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
