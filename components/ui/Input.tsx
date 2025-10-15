"use client";

import { InputHTMLAttributes, ReactNode } from "react";
import clsx from "clsx";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: ReactNode;
}

export default function Input({
  label,
  error,
  icon,
  className,
  ...props
}: InputProps) {
  return (
    <div className="w-full flex flex-col gap-2">
      {label && (
        <label htmlFor={props.id} className="text-sm font-medium text-gray-700">
          {label}
        </label>
      )}

      <div
        className={clsx(
          "flex items-center gap-2 border rounded-full px-5 py-3 bg-[#F5F5F5] transition-all duration-200 focus-within:ring-2 focus-within:ring-primary focus-within:border-transparent",
          {
            "border-gray-200": !error,
            "border-red-500": error,
          },
          className
        )}>
        {icon && <span className="text-gray-400 text-lg">{icon}</span>}
        <input
          {...props}
          className={clsx(
            "w-full outline-none bg-transparent text-base text-gray-800 placeholder-gray-400",
            props.disabled && "cursor-not-allowed opacity-70"
          )}
        />
      </div>

      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}
