"use client";

import { ReactNode, useState } from "react";
import { ChevronLeft } from "lucide-react";
import { cn } from "@/lib/utils/classnames";

interface Tab {
  key: string;
  label: string;
  content: ReactNode;
}

interface DetailLayoutProps {
  header: ReactNode;
  tabs: Tab[];
  onBack?: () => void;
}

export default function DetailLayout({
  header,
  tabs,
  onBack,
}: DetailLayoutProps) {
  const [activeTab, setActiveTab] = useState(tabs[0]?.key || "");

  const handleBack = () => {
    if (onBack) onBack();
  };

  return (
    <div className="bg-white rounded-2xl p-6 w-full">
      <button
        onClick={handleBack}
        className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-800 font-medium mb-6 transition">
        <ChevronLeft size={18} />
        <span>Back</span>
      </button>

      <div className="max-w-5xl mx-auto">
        {header}

        <div className="flex justify-center gap-6 border-b border-gray-100 mt-6 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={cn(
                "pb-3 text-sm font-medium whitespace-nowrap transition border-b-2",
                activeTab === tab.key
                  ? "text-primary border-primary"
                  : "text-gray-500 border-transparent hover:text-gray-700"
              )}>
              {tab.label}
            </button>
          ))}
        </div>

        <div className="py-6">
          {tabs.find((t) => t.key === activeTab)?.content}
        </div>
      </div>
    </div>
  );
}
