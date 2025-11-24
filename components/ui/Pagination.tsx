"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  const handlePrev = () => {
    if (currentPage > 1) onPageChange(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) onPageChange(currentPage + 1);
  };

  const getPageNumbers = () => {
    const delta = 2;

    const start = Math.max(1, currentPage - delta);
    const end = Math.min(totalPages, currentPage + delta);

    const range: number[] = [];

    for (let i = start; i <= end; i++) {
      range.push(i);
    }

    return range;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="flex items-center justify-between bg-white border border-gray-200 rounded-lg px-4 py-2 mt-6">
      <p className="text-sm text-gray-600">
        Page <span className="font-medium">{currentPage}</span> of{" "}
        <span className="font-medium">{totalPages}</span>
      </p>

      <div className="flex items-center space-x-2">
        <button
          onClick={handlePrev}
          disabled={currentPage === 1}
          className="flex items-center justify-center w-8 h-8 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">
          <ChevronLeft size={16} />
        </button>

        {pageNumbers.map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`w-8 h-8 flex items-center justify-center rounded-lg text-sm border transition ${
              currentPage === page
                ? "bg-[#FE7F32] text-white border-[#FE7F32]"
                : "border-gray-200 text-gray-700 hover:bg-gray-50"
            }`}>
            {page}
          </button>
        ))}

        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className="flex items-center justify-center w-8 h-8 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}
