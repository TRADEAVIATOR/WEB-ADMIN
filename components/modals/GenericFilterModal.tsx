"use client";

import Modal from "@/components/ui/Modal";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { GenericFilterModalProps } from "@/types/props";
import Button from "@/components/ui/Button";
import { useState, useEffect } from "react";

export default function GenericFilterModal({
  isOpen,
  onClose,
  fields,
  title = "Filter",
}: GenericFilterModalProps) {
  const safeFields = Array.isArray(fields) ? fields : [];

  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const [values, setValues] = useState<Record<string, any>>({});

  useEffect(() => {
    const initialValues: Record<string, any> = {};
    safeFields.forEach((f) => {
      const param = searchParams.get(f.name);
      if (param)
        initialValues[f.name] =
          f.type === "checkbox" ? param.split(",") : param;
    });
    setValues(initialValues);
  }, [safeFields, searchParams]);

  const handleChange = (name: string, value: any) => {
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const toggleCheckbox = (name: string, option: string) => {
    setValues((prev) => {
      const current: string[] = prev[name] || [];
      return {
        ...prev,
        [name]: current.includes(option)
          ? current.filter((v) => v !== option)
          : [...current, option],
      };
    });
  };

  const handleApply = () => {
    const params = new URLSearchParams(searchParams.toString());
    safeFields.forEach((f) => {
      params.delete(f.name);
      const value = values[f.name];
      if (value)
        params.set(f.name, Array.isArray(value) ? value.join(",") : value);
    });
    router.push(`${pathname}?${params.toString()}`);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title}>
      <div className="space-y-4 mt-4">
        {safeFields.map((f) => {
          if (f.type === "checkbox" && f.options) {
            return (
              <div key={f.name}>
                <p className="text-gray-700 font-medium mb-2">{f.label}</p>
                <div className="flex flex-wrap gap-3">
                  {f.options.map((opt) => (
                    <label
                      key={opt.value}
                      className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={(values[f.name] || []).includes(opt.value)}
                        onChange={() => toggleCheckbox(f.name, opt.value)}
                        className="accent-[#FE7F32]"
                      />
                      <span>{opt.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            );
          }

          if (f.type === "select" && f.options) {
            return (
              <div key={f.name}>
                <p className="text-gray-700 font-medium mb-2">{f.label}</p>
                <select
                  value={values[f.name] || ""}
                  onChange={(e) => handleChange(f.name, e.target.value)}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-gray-700">
                  <option value="">All</option>
                  {f.options.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>
            );
          }

          if (f.type === "text") {
            return (
              <div key={f.name}>
                <p className="text-gray-700 font-medium mb-2">{f.label}</p>
                <input
                  type="text"
                  value={values[f.name] || ""}
                  onChange={(e) => handleChange(f.name, e.target.value)}
                  placeholder={`Enter ${f.label}`}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-gray-700"
                />
              </div>
            );
          }

          return null;
        })}
      </div>

      <div className="flex justify-end gap-3 mt-6">
        <Button variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleApply}>
          Apply
        </Button>
      </div>
    </Modal>
  );
}
