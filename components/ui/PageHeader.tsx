"use client";

import Link from "next/link";
import { Search, Calendar } from "lucide-react";
import { PageHeaderProps } from "@/types/props";
import { useModal } from "@/context/ModalContext";
import Button from "./Button";

export default function PageHeader({
  onSearch,
  onDateSelect,
  showDateSelect = true,
  buttonText,
  buttonIcon,
  buttonHref,
  filterFields,
  modalTypeToOpen,
}: PageHeaderProps) {
  const { openModal } = useModal();

  const handleFilterClick = () => {
    if (filterFields?.length) {
      openModal("generic-filter", filterFields);
    }
  };

  const renderActionButton = () => {
    if (buttonHref) {
      return (
        <Link href={buttonHref}>
          <Button className="flex items-center gap-2 text-white text-sm px-5 py-2.5 rounded-full">
            {buttonIcon && buttonIcon}
            <span>{buttonText}</span>
          </Button>
        </Link>
      );
    }

    if (buttonText && modalTypeToOpen) {
      return (
        <Button
          onClick={() => openModal(modalTypeToOpen)}
          className="flex items-center gap-2 text-white text-sm px-5 py-2.5 rounded-full">
          {buttonIcon && buttonIcon}
          <span>{buttonText}</span>
        </Button>
      );
    }

    return (
      showDateSelect && (
        <button
          onClick={onDateSelect}
          className="flex items-center gap-2 px-4 py-2.5 border border-gray-200 rounded-full text-sm text-gray-700 bg-white hover:bg-gray-50 transition">
          <Calendar size={17} />
          <span>Select Dates</span>
        </button>
      )
    );
  };

  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 w-full md:w-auto">
        <div className="relative w-full sm:w-72 bg-white rounded-full">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            placeholder="Search..."
            onChange={(e) => onSearch?.(e.target.value)}
            className="w-full pl-11 pr-4 py-2.5 border border-gray-200 rounded-full text-sm bg-white text-gray-700 focus:ring-2 focus:ring-[#FE7F32] focus:outline-none"
          />
        </div>

        {filterFields?.length ? (
          <button
            onClick={handleFilterClick}
            className="flex items-center gap-2 px-4 py-2.5 border border-gray-200 rounded-full text-sm text-gray-700 bg-white hover:bg-gray-50 transition">
            <span>Filter</span>
          </button>
        ) : null}
      </div>

      {renderActionButton()}
    </div>
  );
}
