"use client";

import Link from "next/link";
import { Search, Calendar, ChevronLeft } from "lucide-react";
import { PageHeaderProps } from "@/types/props";
import { useRouter, useSearchParams } from "next/navigation";
import { useModal } from "@/context/ModalContext";
import Button from "./Button";

export default function PageHeader({
  title,
  description,

  onSearch,
  onDateSelect,
  showBackButton = false,

  buttonText,
  buttonIcon,
  buttonHref,
  filterFields,
  modalTypeToOpen,
  buttonAction,
}: PageHeaderProps) {
  const { openModal } = useModal();
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleFilterClick = () => {
    if (filterFields?.length) {
      openModal("generic-filter", filterFields);
    }
  };

  const handleSearchChange = (value: string) => {
    if (!onSearch) return;

    const params = new URLSearchParams(searchParams.toString());

    if (value) {
      params.set("search", value);
    } else {
      params.delete("search");
    }

    router.push(`?${params.toString()}`);
    onSearch(value);
  };

  const renderActionButton = () => {
    if (buttonHref) {
      return (
        <Link href={buttonHref}>
          <Button className="flex items-center gap-2 text-white text-sm px-5 py-2.5 rounded-full">
            {buttonIcon}
            <span>{buttonText}</span>
          </Button>
        </Link>
      );
    }

    if (buttonText) {
      return (
        <Button
          onClick={() => {
            if (buttonAction) {
              buttonAction();
            } else if (modalTypeToOpen) {
              openModal(modalTypeToOpen);
            }
          }}
          className="flex items-center gap-2 text-white text-sm px-5 py-2.5 rounded-full">
          {buttonIcon}
          <span>{buttonText}</span>
        </Button>
      );
    }

    if (onDateSelect) {
      return (
        <button
          onClick={onDateSelect}
          className="flex items-center gap-2 px-4 py-2.5 border border-gray-200 rounded-full text-sm text-gray-700 bg-white hover:bg-gray-50 transition">
          <Calendar size={17} />
          <span>Select Dates</span>
        </button>
      );
    }

    return null;
  };

  return (
    <div className="mb-6 space-y-4">
      {showBackButton && (
        <div className="mb-4">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-1 text-sm text-gray-600 hover:text-gray-800 transition">
            <ChevronLeft size={18} />
            <span>Back</span>
          </button>
        </div>
      )}

      {(title || description) && (
        <div className="mb-4">
          {title && (
            <h1 className="text-2xl font-semibold text-gray-900">{title}</h1>
          )}
          {description && (
            <p className="text-sm text-gray-500 mt-1">{description}</p>
          )}
        </div>
      )}

      {(onSearch || filterFields?.length || renderActionButton()) && (
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 w-full md:w-auto">
            {onSearch && (
              <div className="relative w-full sm:w-72 bg-white rounded-full">
                <Search
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />
                <input
                  type="text"
                  placeholder="Search..."
                  defaultValue={searchParams.get("search") ?? ""}
                  onChange={(e) => handleSearchChange(e.target.value)}
                  className="w-full pl-11 pr-4 py-2.5 border border-gray-200 rounded-full text-sm bg-white text-gray-700 focus:ring-2 focus:ring-[#FE7F32] focus:outline-none"
                />
              </div>
            )}

            {filterFields?.length && (
              <button
                onClick={handleFilterClick}
                className="flex items-center gap-2 px-4 py-2.5 border border-gray-200 rounded-full text-sm text-gray-700 bg-white hover:bg-gray-50 transition">
                <span>Filter</span>
              </button>
            )}
          </div>

          {renderActionButton()}
        </div>
      )}
    </div>
  );
}
