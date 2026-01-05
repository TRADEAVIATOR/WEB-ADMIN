"use client";

import { ButtonHTMLAttributes, ReactNode } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import clsx from "clsx";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:
    | "primary"
    | "secondary"
    | "outline"
    | "danger"
    | "ghost"
    | "success";
  size?: "sm" | "md" | "lg";
  rounded?: "none" | "md" | "lg" | "full";
  isLoading?: boolean;
  icon?: ReactNode;
  iconPosition?: "left" | "right";
}

export default function Button({
  children,
  variant = "primary",
  size = "md",
  rounded = "full",
  isLoading = false,
  icon,
  iconPosition = "left",
  className,
  disabled,
  ...props
}: ButtonProps) {
  const isDisabled = disabled || isLoading;

  return (
    <button
      disabled={isDisabled}
      className={clsx(
        "flex items-center cursor-pointer justify-center gap-2 font-semibold transition-all duration-200 focus:outline-none disabled:cursor-not-allowed",
        {
          "bg-primary text-white hover:bg-opacity-90 disabled:bg-opacity-60":
            variant === "primary",
          "bg-secondary text-white hover:bg-opacity-90 disabled:bg-opacity-60":
            variant === "secondary",
          "bg-green-500 text-white hover:bg-green-600 disabled:opacity-60":
            variant === "success",
          "border border-gray-300 text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-60":
            variant === "outline",
          "bg-red-500 text-white hover:bg-red-600 disabled:opacity-60":
            variant === "danger",
          "bg-transparent text-gray-700 hover:bg-gray-100 disabled:opacity-50":
            variant === "ghost",

          "px-4 py-2 text-sm": size === "sm",
          "px-6 py-3 text-base": size === "md",
          "px-8 py-4 text-lg": size === "lg",

          "rounded-none": rounded === "none",
          "rounded-md": rounded === "md",
          "rounded-lg": rounded === "lg",
          "rounded-full": rounded === "full",
        },
        className
      )}
      {...props}>
      {isLoading ? (
        <>
          <AiOutlineLoading3Quarters className="animate-spin text-xl" />
          <span className="sr-only">Loading</span>
        </>
      ) : (
        <>
          {icon && iconPosition === "left" && icon}
          {children}
          {icon && iconPosition === "right" && icon}
        </>
      )}
    </button>
  );
}
