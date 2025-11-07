"use client";

import { FiChevronRight } from "react-icons/fi";
import clsx from "clsx";

type Props = {
  active: "birthday" | "general" | "holiday";
  setActive: (v: "birthday" | "general" | "holiday") => void;
};

export default function TabsList({ active, setActive }: Props) {
  return (
    <div className="space-y-6">
      <div
        role="button"
        tabIndex={0}
        onClick={() => setActive("birthday")}
        onKeyDown={(e) =>
          (e.key === "Enter" || e.key === " ") && setActive("birthday")
        }
        className={clsx(
          "flex gap-4 items-center cursor-pointer p-3 rounded-lg",
          active === "birthday"
            ? "bg-primary/10 ring-2 ring-primary/30"
            : "hover:bg-gray-50"
        )}>
        <button
          className={clsx(
            "font-bold px-4 rounded-full text-lg h-10 w-10 flex items-center justify-center",
            active === "birthday"
              ? "bg-primary text-white"
              : "border border-gray-300 text-gray-600"
          )}>
          1
        </button>
        <div className="flex-1">
          <h3 className="font-semibold text-sm sm:text-base">Birthday Wish</h3>
          <p className="text-xs sm:text-sm text-gray-500">
            Send birthday push notification to a user
          </p>
        </div>
        <FiChevronRight className="text-xl text-gray-400" />
      </div>

      <div
        role="button"
        tabIndex={0}
        onClick={() => setActive("general")}
        onKeyDown={(e) =>
          (e.key === "Enter" || e.key === " ") && setActive("general")
        }
        className={clsx(
          "flex gap-4 items-center cursor-pointer p-3 rounded-lg",
          active === "general"
            ? "bg-primary/10 ring-2 ring-primary/30"
            : "hover:bg-gray-50"
        )}>
        <button
          className={clsx(
            "font-bold px-4 rounded-full text-lg h-10 w-10 flex items-center justify-center",
            active === "general"
              ? "bg-primary text-white"
              : "border border-gray-300 text-gray-600"
          )}>
          2
        </button>
        <div className="flex-1">
          <h3 className="font-semibold text-sm sm:text-base">
            General Notification
          </h3>
          <p className="text-xs sm:text-sm text-gray-500">
            Send general push notification to users
          </p>
        </div>
        <FiChevronRight className="text-xl text-gray-400" />
      </div>

      <div
        role="button"
        tabIndex={0}
        onClick={() => setActive("holiday")}
        onKeyDown={(e) =>
          (e.key === "Enter" || e.key === " ") && setActive("holiday")
        }
        className={clsx(
          "flex gap-4 items-center cursor-pointer p-3 rounded-lg",
          active === "holiday"
            ? "bg-primary/10 ring-2 ring-primary/30"
            : "hover:bg-gray-50"
        )}>
        <button
          className={clsx(
            "font-bold px-4 rounded-full text-lg h-10 w-10 flex items-center justify-center",
            active === "holiday"
              ? "bg-primary text-white"
              : "border border-gray-300 text-gray-600"
          )}>
          3
        </button>
        <div className="flex-1">
          <h3 className="font-semibold text-sm sm:text-base">
            Holiday/Celebration
          </h3>
          <p className="text-xs sm:text-sm text-gray-500">
            Send holiday push notifications to users
          </p>
        </div>
        <FiChevronRight className="text-xl text-gray-400" />
      </div>
    </div>
  );
}
