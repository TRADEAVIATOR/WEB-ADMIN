"use client";

import { useState } from "react";
import Link from "next/link";
import { MoreVertical } from "lucide-react";
import Pagination from "./Pagination";
import { MenuItem, RowData } from "@/types/common";

interface Column {
  key: string;
  label: string;
}

interface DataTableProps {
  columns: Column[];
  data: RowData[];
  menuItems?: MenuItem[];
}

export default function DataTable({
  columns,
  data,
  menuItems = [],
}: DataTableProps) {
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [openMenuIndex, setOpenMenuIndex] = useState<number | null>(null);

  const handleSelectAll = (checked: boolean) => {
    if (checked) setSelectedRows(data.map((_, index) => index.toString()));
    else setSelectedRows([]);
  };

  const handleSelectRow = (index: number, checked: boolean) => {
    setSelectedRows((prev) =>
      checked
        ? [...prev, index.toString()]
        : prev.filter((id) => id !== index.toString())
    );
  };

  const isRowSelected = (index: number) =>
    selectedRows.includes(index.toString());
  const toggleMenu = (index: number) =>
    setOpenMenuIndex((prev) => (prev === index ? null : index));

  return (
    <>
      <div className="w-full overflow-x-auto border border-gray-100 relative">
        <table className="min-w-full text-sm bg-white">
          <thead className="bg-[#F0F2F5] text-[#101928]">
            <tr>
              <th className="py-3 px-4 text-left">
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
              <th className="py-3 px-4 text-right font-medium">Actions</th>
            </tr>
          </thead>

          <tbody>
            {data.map((row, idx) => (
              <tr
                key={idx}
                className={`border-b border-gray-100 last:border-b-0 transition-colors relative ${
                  isRowSelected(idx) ? "bg-[#FFF5EE]" : "hover:bg-gray-50"
                }`}>
                <td className="py-3 px-4">
                  <input
                    type="checkbox"
                    checked={isRowSelected(idx)}
                    onChange={(e) => handleSelectRow(idx, e.target.checked)}
                    className="accent-[#FE7F32] cursor-pointer"
                  />
                </td>
                {columns.map((col) => (
                  <td
                    key={col.key}
                    className="py-3 px-4 whitespace-nowrap text-[#101928]">
                    {row[col.key]}
                  </td>
                ))}
                <td className="py-3 px-4 text-right relative">
                  <button
                    className="p-1 text-gray-500 hover:text-[#FE7F32]"
                    onClick={() => toggleMenu(idx)}>
                    <MoreVertical size={18} />
                  </button>

                  {openMenuIndex === idx && (
                    <div className="absolute right-4 mt-2 w-40 bg-white border border-gray-100 rounded-lg shadow-lg z-10 animate-fadeIn">
                      <ul className="py-2 text-sm text-gray-700">
                        {menuItems.map((item, i) => {
                          const baseClasses = `block px-4 py-2 hover:bg-gray-50 cursor-pointer ${
                            item.color || "text-gray-700"
                          }`;
                          if (item.href)
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
                          return (
                            <li
                              key={i}
                              onClick={() => {
                                item.onClick?.(row);
                                setOpenMenuIndex(null);
                              }}
                              className={baseClasses}>
                              {item.label}
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {data.length === 0 && (
          <p className="text-center text-gray-500 py-6 text-sm">
            No records found.
          </p>
        )}
      </div>

      <Pagination currentPage={1} totalPages={6} onPageChange={() => {}} />

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
    </>
  );
}
