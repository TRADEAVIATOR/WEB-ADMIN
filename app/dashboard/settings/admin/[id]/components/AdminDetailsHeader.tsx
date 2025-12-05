"use client";

import { MoreVertical } from "lucide-react";
import AvatarImg from "@/assets/icons/avatar.svg";
import Image from "next/image";

interface AdminDetailsHeaderProps {
  name: string;
  username: string;
  status: string;
}

export default function AdminDetailsHeader({
  name,
  username,
  status,
}: AdminDetailsHeaderProps) {
  const isActive = status === "Active";

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-6 w-full">
      <div className="flex items-center gap-4 sm:gap-6 w-full sm:w-auto">
        <div className="relative flex-shrink-0">
          <Image
            src={AvatarImg}
            alt={`${name} Avatar`}
            width={80}
            height={80}
            className="rounded-full object-cover w-16 h-16 sm:w-20 sm:h-20"
            priority
          />
        </div>

        <div className="flex-1 min-w-0">
          <h2 className="text-lg font-semibold text-gray-900">{name}</h2>
          <p className="text-gray-500 text-sm">{username}</p>
          <span
            className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${
              isActive
                ? "bg-green-100 text-green-700"
                : "bg-gray-100 text-gray-500"
            }`}>
            <span
              className={`w-2 h-2 rounded-full ${
                isActive ? "bg-green-500" : "bg-gray-400"
              }`}></span>
            {status}
          </span>
        </div>
      </div>

      <button className="flex flex-col items-center gap-1 p-2 rounded-md hover:bg-gray-50 text-gray-500 hover:text-gray-800 transition w-full sm:w-auto sm:flex-none border sm:border-0 border-gray-100">
        <MoreVertical size={22} />
        <span className="text-xs font-medium text-gray-500">More actions</span>
      </button>
    </div>
  );
}
