"use client";

import { ReactNode } from "react";
import Select, { ActionMeta, MultiValue, SingleValue } from "react-select";
import clsx from "clsx";

export type SelectOption = { label: string; value: string };

type BaseProps = {
  id: string;
  label?: string;
  options: SelectOption[];
  placeholder?: string;
  required?: boolean;
  optional?: boolean;
  icon?: ReactNode;
  className?: string;
  error?: string;
};

type SingleSelectProps = {
  isMulti?: false;
  value?: SingleValue<SelectOption>;
  defaultValue?: SingleValue<SelectOption>;
  onChange?: (
    value: SingleValue<SelectOption>,
    actionMeta: ActionMeta<SelectOption>
  ) => void;
};

type MultiSelectProps = {
  isMulti: true;
  value?: MultiValue<SelectOption>;
  defaultValue?: MultiValue<SelectOption>;
  onChange?: (
    value: MultiValue<SelectOption>,
    actionMeta: ActionMeta<SelectOption>
  ) => void;
};

type SelectFieldProps = BaseProps & (SingleSelectProps | MultiSelectProps);

export default function SelectField({
  id,
  label,
  options,
  placeholder = "Select...",
  required,
  optional,
  icon,
  className,
  error,
  value,
  defaultValue,
  onChange,
  isMulti,
}: SelectFieldProps) {
  return (
    <div className="w-full flex flex-col gap-2">
      {label && (
        <label
          htmlFor={id}
          className="text-sm font-medium text-gray-700 flex items-center gap-1">
          {label}
          {required && <span className="text-red-500">*</span>}
          {optional && !required && (
            <span className="text-gray-400 text-sm">(optional)</span>
          )}
        </label>
      )}

      <div
        className={clsx(
          "flex items-center gap-2 border rounded-full bg-[#F5F5F5] px-5 py-3 transition-all duration-200 focus-within:ring-2 focus-within:ring-primary focus-within:border-transparent",
          { "border-gray-200": !error, "border-red-500": error },
          className
        )}>
        {icon && <span className="text-gray-400 text-lg">{icon}</span>}

        <Select
          inputId={id}
          name={id}
          options={options}
          value={value}
          defaultValue={defaultValue}
          isMulti={isMulti}
          placeholder={placeholder}
          onChange={(val, meta) => {
            if (!onChange) return;
            if (isMulti) {
              onChange(val as MultiValue<SelectOption>, meta);
            } else {
              onChange(val as SingleValue<SelectOption>, meta);
            }
          }}
          className="w-full text-gray-800 bg-transparent"
          classNamePrefix="react-select"
          styles={{
            control: (provided) => ({
              ...provided,
              boxShadow: "none",
              border: "none",
              background: "transparent",
            }),
            placeholder: (provided) => ({ ...provided, color: "#9CA3AF" }),
            singleValue: (provided) => ({ ...provided, color: "#111827" }),
            multiValue: (provided) => ({
              ...provided,
              backgroundColor: "#E0F2FE",
              color: "#0284C7",
              borderRadius: 6,
            }),
            option: (provided, state) => ({
              ...provided,
              backgroundColor: state.isFocused
                ? "#F3F4F6"
                : state.isSelected
                ? "#0284C7"
                : "#FFF",
              color: state.isSelected ? "#FFF" : "#111827",
            }),
            indicatorSeparator: () => ({ display: "none" }),
          }}
        />
      </div>

      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}
