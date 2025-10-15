"use client";

import { useState, useEffect } from "react";
import clsx from "clsx";

interface SelectProps {
  options: string[];
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
}

export default function Select({
  options,
  value,
  onChange,
  className,
}: SelectProps) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(value || options[0]);

  useEffect(() => {
    if (value) setSelected(value);
  }, [value]);

  const handleSelect = (val: string) => {
    setSelected(val);
    setOpen(false);
    onChange?.(val);
  };

  return (
    <div className={clsx("relative inline-block", className)}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="bg-[#F6F6F6] rounded-full px-4 py-2 text-sm flex justify-between items-center focus:outline-none min-w-[100px]">
        {selected}
        <span className="ml-2">&#9662;</span>
      </button>

      {open && (
        <ul className="absolute top-full left-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-md z-10 min-w-full">
          {options.map((opt) => (
            <li
              key={opt}
              onClick={() => handleSelect(opt)}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm">
              {opt}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
