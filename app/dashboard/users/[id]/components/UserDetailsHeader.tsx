"use client";

import Image from "next/image";
import AvatarImg from "@/assets/icons/avatar.svg";
import { Clock, MoreVertical, X } from "lucide-react";
import { FaCheckCircle } from "react-icons/fa";

interface UserDetailsHeaderProps {
  userId: string;
  name: string;
  kycStatus: "Successful" | "Pending" | "Failed";
  profilePicture?: string | null;
  onMenuClick?: () => void;
}

export default function UserDetailsHeader({
  userId,
  name,
  kycStatus,
  profilePicture,
  onMenuClick,
}: UserDetailsHeaderProps) {
  const statusStyles = {
    Successful: {
      bg: "bg-green-100",
      text: "text-green-700",
      icon: <FaCheckCircle size={14} className="text-green-600" />,
    },
    Pending: {
      bg: "bg-yellow-100",
      text: "text-yellow-700",
      icon: <Clock size={14} className="text-yellow-600" />,
    },
    Failed: {
      bg: "bg-red-100",
      text: "text-red-700",
      icon: <X size={14} className="text-red-600" />,
    },
  };

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-6 w-full">
      <div className="flex items-center gap-4 sm:gap-6 w-full sm:w-auto">
        <div className="relative flex-shrink-0">
          <Image
            src={profilePicture || AvatarImg}
            alt={`${name} Avatar`}
            width={80}
            height={80}
            className="rounded-full object-cover w-16 h-16 sm:w-20 sm:h-20"
            priority
          />
        </div>

        <div className="flex-1 min-w-0">
          <p className="text-xs text-gray-400 font-medium truncate">{userId}</p>
          <h2 className="text-lg sm:text-xl font-semibold text-gray-900 leading-snug truncate">
            {name}
          </h2>

          <div className="mt-2 flex flex-wrap items-center gap-1.5">
            <span className="text-sm text-gray-500">KYC Status:</span>
            <span
              className={`inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium rounded-full ${statusStyles[kycStatus].bg} ${statusStyles[kycStatus].text}`}>
              {statusStyles[kycStatus].icon}
              {kycStatus}
            </span>
          </div>
        </div>
      </div>

      <button
        onClick={onMenuClick}
        className="flex flex-col items-center gap-1 p-2 rounded-md hover:bg-gray-50 text-gray-500 hover:text-gray-800 transition w-full sm:w-auto sm:flex-none border sm:border-0 border-gray-100">
        <MoreVertical size={22} />
        <span className="text-xs font-medium text-gray-500">More actions</span>
      </button>
    </div>
  );
}
