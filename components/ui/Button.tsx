"use client";

import { ButtonHTMLAttributes } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import clsx from "clsx";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline";
  isLoading?: boolean;
}

export default function Button({
  children,
  variant = "primary",
  isLoading = false,
  className,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      disabled={disabled || isLoading}
      className={clsx(
        "flex items-center justify-center gap-2 w-full py-4 rounded-full text-lg font-semibold transition-all duration-200 focus:outline-none",
        {
          "bg-primary text-white hover:bg-opacity-90 disabled:bg-opacity-60":
            variant === "primary",
          "bg-secondary text-white hover:bg-opacity-90 disabled:bg-opacity-60":
            variant === "secondary",
          "border border-gray-300 text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-60":
            variant === "outline",
        },
        className
      )}
      {...props}>
      {isLoading ? (
        <AiOutlineLoading3Quarters className="animate-spin text-xl" />
      ) : (
        children
      )}
    </button>
  );
}
