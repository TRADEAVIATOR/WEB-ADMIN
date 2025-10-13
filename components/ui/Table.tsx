"use client";

import { useState } from "react";
import { MoreVertical } from "lucide-react";
import Pagination from "./Pagination";

interface Column {
  key: string;
  label: string;
}

interface RowData {
  [key: string]: string | number;
}

interface DataTableProps {
  columns: Column[];
  data: RowData[];
}

export default function DataTable({ columns, data }: DataTableProps) {
  const [selectedRows, setSelectedRows] = useState<string[]>([]);

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedRows(data.map((_, index) => index.toString()));
    } else {
      setSelectedRows([]);
    }
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

  return (
    <>
      <div className="w-full overflow-x-auto border border-gray-100">
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
                className={`border-b border-gray-100 last:border-b-0 transition-colors ${
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
                <td className="py-3 px-4 text-right">
                  <button className="p-1 text-gray-500 hover:text-[#FE7F32]">
                    <MoreVertical size={18} />
                  </button>
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
    </>
  );
}
