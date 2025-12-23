"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { MenuItem, ModalType, RowData } from "@/types/common";
import { MoreVertical } from "lucide-react";
import { useModal } from "@/context/ModalContext";

interface Column {
  key: string;
  label: string;
}

interface DataTableProps<T extends RowData> {
  columns: Column[];
  data: T[];
  menuItems?: MenuItem<T>[];
  modalKey?: ModalType;
}

export default function DataTable<T extends RowData>({
  columns,
  data,
  menuItems = [],
  modalKey,
}: DataTableProps<T>) {
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [openMenuIndex, setOpenMenuIndex] = useState<number | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const { openModal } = useModal();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpenMenuIndex(null);
      }
    };

    if (openMenuIndex !== null) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("touchstart", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [openMenuIndex]);

  const handleSelectAll = (checked: boolean) => {
    if (checked) setSelectedRows(data.map((_, index) => index.toString()));
    else setSelectedRows([]);
  };

  const handleSelectRow = (
    index: number,
    checked: boolean,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    e.stopPropagation();
    setSelectedRows((prev) =>
      checked
        ? [...prev, index.toString()]
        : prev.filter((id) => id !== index.toString())
    );
  };

  const isRowSelected = (index: number) =>
    selectedRows.includes(index.toString());

  const toggleMenu = (
    index: number,
    e: React.MouseEvent | React.TouchEvent
  ) => {
    e.preventDefault();
    e.stopPropagation();
    setOpenMenuIndex((prev) => (prev === index ? null : index));
  };

  const handleRowClick = (row: T) => {
    if (!modalKey || openMenuIndex !== null) return;
    openModal(modalKey, row);
  };

  return (
    <div className="w-full max-w-full">
      <div className="block lg:hidden">
        {data.length === 0 ? (
          <p className="text-center text-gray-500 py-6 text-sm">
            No records found.
          </p>
        ) : (
          <div className="space-y-3">
            {data.map((row, idx) => (
              <div
                key={idx}
                className={`border border-gray-200 rounded-lg p-4 ${
                  isRowSelected(idx)
                    ? "bg-[#FFF5EE] border-[#FE7F32]"
                    : "bg-white"
                }`}>
                <div className="flex items-start justify-between mb-3">
                  <input
                    type="checkbox"
                    checked={isRowSelected(idx)}
                    onChange={(e) => handleSelectRow(idx, e.target.checked, e)}
                    onClick={(e) => e.stopPropagation()}
                    className="accent-[#FE7F32] cursor-pointer mt-1"
                  />

                  {menuItems.length > 0 && (
                    <div
                      className="relative z-50"
                      ref={openMenuIndex === idx ? menuRef : null}>
                      <button
                        type="button"
                        className="p-2 text-gray-500 hover:text-[#FE7F32] active:text-[#FE7F32] touch-manipulation"
                        onClick={(e) => toggleMenu(idx, e)}
                        onTouchEnd={(e) => toggleMenu(idx, e)}>
                        <MoreVertical size={20} />
                      </button>

                      {openMenuIndex === idx && (
                        <div
                          className="fixed inset-0 z-[9999]"
                          onClick={() => setOpenMenuIndex(null)}>
                          <div
                            className="absolute right-4 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-2xl animate-fadeIn"
                            style={{
                              top: `${(idx + 1) * 160}px`,
                              maxHeight: "80vh",
                              overflowY: "auto",
                            }}
                            onClick={(e) => e.stopPropagation()}>
                            <ul className="py-2 text-sm text-gray-700">
                              {menuItems.map((item, i) => {
                                const baseClasses = `block px-5 py-3 hover:bg-gray-50 active:bg-gray-100 cursor-pointer transition-colors touch-manipulation ${
                                  item.color || "text-gray-700"
                                }`;

                                if (item.href) {
                                  return (
                                    <li key={i}>
                                      <Link
                                        href={item.href}
                                        className={baseClasses}
                                        onClick={() => setOpenMenuIndex(null)}>
                                        {item.label}
                                      </Link>
                                    </li>
                                  );
                                }

                                return (
                                  <li key={i}>
                                    <div
                                      onClick={() => {
                                        item.onClick?.(row);
                                        setOpenMenuIndex(null);
                                      }}
                                      onTouchEnd={() => {
                                        item.onClick?.(row);
                                        setOpenMenuIndex(null);
                                      }}
                                      className={baseClasses}>
                                      {item.label}
                                    </div>
                                  </li>
                                );
                              })}
                            </ul>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                <div
                  onClick={() => handleRowClick(row)}
                  className="space-y-2 cursor-pointer">
                  {columns.map((col) => (
                    <div
                      key={col.key}
                      className="flex justify-between items-start gap-4">
                      <span className="text-xs font-medium text-gray-500 uppercase flex-shrink-0">
                        {col.label}
                      </span>
                      <span className="text-sm text-[#101928] text-right break-words">
                        {row[col.key]}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="hidden lg:block w-full overflow-x-auto border border-gray-100 rounded-lg">
        <div className="min-w-full inline-block align-middle">
          <table className="min-w-full text-sm bg-white">
            <thead className="bg-[#F0F2F5] text-[#101928]">
              <tr>
                <th className="py-3 px-4 text-left w-12 sticky left-0 bg-[#F0F2F5] z-50">
                  <input
                    type="checkbox"
                    checked={
                      selectedRows.length === data.length && data.length > 0
                    }
                    onChange={(e) => handleSelectAll(e.target.checked)}
                    className="accent-[#FE7F32] cursor-pointer"
                  />
                </th>
                {columns.map((col) => (
                  <th
                    key={col.key}
                    className="py-3 px-4 text-left font-medium whitespace-nowrap">
                    {col.label}
                  </th>
                ))}
                <th className="py-3 px-4 text-right font-medium whitespace-nowrap w-24">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {data.map((row, idx) => (
                <tr
                  key={idx}
                  onClick={() => handleRowClick(row)}
                  className={`border-b border-gray-100 last:border-b-0 transition-colors cursor-pointer ${
                    isRowSelected(idx) ? "bg-[#FFF5EE]" : "hover:bg-gray-50"
                  }`}>
                  <td
                    className="py-3 px-4 sticky left-0 bg-inherit z-10"
                    onClick={(e) => e.stopPropagation()}>
                    <input
                      type="checkbox"
                      checked={isRowSelected(idx)}
                      onChange={(e) =>
                        handleSelectRow(idx, e.target.checked, e)
                      }
                      className="accent-[#FE7F32] cursor-pointer"
                    />
                  </td>

                  {columns.map((col) => (
                    <td
                      key={col.key}
                      className="py-3 px-4 whitespace-nowrap text-[#101928] max-w-xs truncate">
                      {row[col.key]}
                    </td>
                  ))}

                  <td
                    className="py-3 px-4 text-right whitespace-nowrap"
                    onClick={(e) => e.stopPropagation()}>
                    {menuItems.length > 0 && (
                      <div
                        className="relative inline-block"
                        ref={openMenuIndex === idx ? menuRef : null}>
                        <button
                          type="button"
                          className="p-1 text-gray-500 hover:text-[#FE7F32]"
                          onClick={(e) => toggleMenu(idx, e)}>
                          <MoreVertical size={18} />
                        </button>

                        {openMenuIndex === idx && (
                          <div className="absolute right-0 mt-2 w-44 bg-white border border-gray-100 rounded-lg shadow-lg z-50 animate-fadeIn">
                            <ul className="py-2 text-sm text-gray-700">
                              {menuItems.map((item, i) => {
                                const baseClasses = `block px-4 py-2 hover:bg-gray-50 cursor-pointer transition-colors ${
                                  item.color || "text-gray-700"
                                }`;

                                if (item.href) {
                                  return (
                                    <li key={i}>
                                      <Link
                                        href={item.href}
                                        className={baseClasses}
                                        onClick={() => setOpenMenuIndex(null)}>
                                        {item.label}
                                      </Link>
                                    </li>
                                  );
                                }

                                return (
                                  <li key={i}>
                                    <div
                                      onClick={() => {
                                        item.onClick?.(row);
                                        setOpenMenuIndex(null);
                                      }}
                                      className={baseClasses}>
                                      {item.label}
                                    </div>
                                  </li>
                                );
                              })}
                            </ul>
                          </div>
                        )}
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-5px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.15s ease-in-out;
        }
      `}</style>
    </div>
  );
}
