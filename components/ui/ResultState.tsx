"use client";

import { ReactNode } from "react";
import { AlertTriangle, Inbox, Info, CheckCircle } from "lucide-react";
import Button from "./Button";

interface ResultStateProps {
  type?: "empty" | "error" | "info" | "success";
  title?: string;
  message: string;
  onRetry?: () => void;
  retryLabel?: string;
  icon?: ReactNode;
  children?: ReactNode;
}

export default function ResultState({
  type = "empty",
  title,
  message,
  onRetry,
  retryLabel = "Retry",
  icon,
  children,
}: ResultStateProps) {
  const icons = {
    empty: <Inbox className="w-10 h-10 text-gray-400" />,
    error: <AlertTriangle className="w-10 h-10 text-red-500" />,
    info: <Info className="w-10 h-10 text-blue-500" />,
    success: <CheckCircle className="w-10 h-10 text-green-500" />,
  };

  return (
    <div className="flex flex-col items-center justify-center text-center py-14 px-4 space-y-4">
      <div>{icon || icons[type]}</div>

      {title && (
        <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
      )}

      <p className="text-gray-500 max-w-md">{message}</p>

      {children}

      {onRetry && (
        <Button
          variant="primary"
          size="md"
          rounded="lg"
          onClick={onRetry}
          className="mt-2">
          {retryLabel}
        </Button>
      )}
    </div>
  );
}
