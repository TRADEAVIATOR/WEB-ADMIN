"use client";

import Link from "next/link";
import { Search, Calendar, ChevronLeft } from "lucide-react";
import { PageHeaderProps } from "@/types/props";
import { useRouter, useSearchParams } from "next/navigation";
import { useModal } from "@/context/ModalContext";
import { useState, useEffect } from "react";
import Button from "./Button";

export default function PageHeader({
  title,
  description,
  onDateSelect,
  showBackButton = false,
  backHref,
  buttonText,
  buttonIcon,
  buttonHref,
  filterFields,
  modalTypeToOpen,
  buttonAction,
  enableSearch = false,
}: PageHeaderProps & { enableSearch?: boolean }) {
  const { openModal } = useModal();
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialSearch = searchParams.get("search") ?? "";
  const [searchValue, setSearchValue] = useState(initialSearch);

  const handleFilterClick = () => {
    if (filterFields?.length) openModal("generic-filter", filterFields);
  };

  useEffect(() => {
    if (!enableSearch) return;

    const handler = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());

      if (searchValue) params.set("search", searchValue);
      else params.delete("search");

      router.push(`?${params.toString()}`);
    }, 200);

    return () => clearTimeout(handler);
  }, [searchValue, router, searchParams, enableSearch]);

  const renderActionButton = () => {
    if (buttonHref)
      return (
        <Link href={buttonHref}>
          <Button className="flex items-center gap-2 text-white text-sm px-5 py-2.5 rounded-full">
            {buttonIcon}
            <span>{buttonText}</span>
          </Button>
        </Link>
      );

    if (buttonText)
      return (
        <Button
          onClick={() => {
            if (buttonAction) buttonAction();
            else if (modalTypeToOpen) openModal(modalTypeToOpen);
          }}
          className="flex items-center gap-2 text-white text-sm px-5 py-2.5 rounded-full">
          {buttonIcon}
          <span>{buttonText}</span>
        </Button>
      );

    if (onDateSelect)
      return (
        <button
          onClick={onDateSelect}
          className="flex items-center gap-2 px-4 py-2.5 border border-gray-200 rounded-full text-sm text-gray-700 bg-white hover:bg-gray-50 transition">
          <Calendar size={17} />
          <span>Select Dates</span>
        </button>
      );

    return null;
  };

  return (
    <div className="mb-6 space-y-4">
      {showBackButton && (
        <div className="mb-4">
          <button
            onClick={() => (backHref ? router.push(backHref) : router.back())}
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

      {(enableSearch || filterFields?.length || buttonText || onDateSelect) && (
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 w-full md:w-auto">
            {enableSearch && (
              <div className="relative w-full sm:w-72 bg-white rounded-full">
                <Search
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  className="w-full pl-11 pr-4 py-2.5 border border-gray-200 rounded-full text-sm bg-white text-gray-700 focus:ring-2 focus:ring-[#FE7F32] focus:outline-none"
                />
              </div>
            )}

            {(filterFields?.length ?? 0) > 0 && (
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
