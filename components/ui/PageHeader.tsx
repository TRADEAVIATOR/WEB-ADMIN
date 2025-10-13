"use client";

import { Search, Filter, Calendar } from "lucide-react";

interface PageHeaderProps {
  onSearch?: (value: string) => void;
  onFilterClick?: () => void;
  onDateSelect?: () => void;
}

export default function PageHeader({
  onSearch,
  onFilterClick,
  onDateSelect,
}: PageHeaderProps) {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3 mb-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 w-full md:w-auto">
        <div className="relative w-full sm:w-64 bg-white rounded-lg">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            placeholder="Search..."
            onChange={(e) => onSearch?.(e.target.value)}
            className="w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg text-sm bg-white text-gray-700 focus:ring-2 focus:ring-[#FE7F32] focus:outline-none"
          />
        </div>

        <button
          onClick={onFilterClick}
          className="flex items-center gap-2 px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-700 bg-white hover:bg-gray-50 transition">
          <Filter size={16} />
          <span>Filter</span>
        </button>
      </div>

      <button
        onClick={onDateSelect}
        className="flex items-center gap-2 px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-700 bg-white hover:bg-gray-50 transition">
        <Calendar size={16} />
        <span>Select Dates</span>
      </button>
    </div>
  );
}
