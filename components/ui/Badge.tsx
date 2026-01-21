"use client";

import { ReactNode } from "react";
import clsx from "clsx";

interface BadgeProps {
  text: string | number;
  color?:
    | "green"
    | "red"
    | "yellow"
    | "blue"
    | "gray"
    | "orange"
    | "purple"
    | "pink"
    | "indigo"
    | "teal";
  icon?: ReactNode;
  className?: string;
}

export const colorClasses: Record<NonNullable<BadgeProps["color"]>, string> = {
  green: "bg-green-100 text-green-800",
  red: "bg-red-100 text-red-800",
  yellow: "bg-yellow-100 text-yellow-800",
  blue: "bg-blue-100 text-blue-800",
  gray: "bg-gray-100 text-gray-800",

  orange: "bg-orange-100 text-orange-800",
  purple: "bg-purple-100 text-purple-800",
  pink: "bg-pink-100 text-pink-800",
  indigo: "bg-indigo-100 text-indigo-800",
  teal: "bg-teal-100 text-teal-800",
};

export default function Badge({
  text,
  color = "gray",
  icon,
  className,
}: BadgeProps) {
  return (
    <span
      className={clsx(
        "inline-flex items-center gap-1 px-2 py-1 text-xs font-semibold rounded-full",
        colorClasses[color],
        className,
      )}>
      {icon && <span className="flex-shrink-0">{icon}</span>}
      {text}
    </span>
  );
}
