"use client";

import {
  InputHTMLAttributes,
  TextareaHTMLAttributes,
  SelectHTMLAttributes,
  ReactNode,
} from "react";
import clsx from "clsx";

type BaseProps = {
  label?: string;
  error?: string;
  icon?: ReactNode;
  className?: string;
  required?: boolean;
};

type InputFieldProps = BaseProps & InputHTMLAttributes<HTMLInputElement>;
type TextareaFieldProps = BaseProps &
  TextareaHTMLAttributes<HTMLTextAreaElement> & { as?: "textarea" };
type SelectFieldProps = BaseProps &
  SelectHTMLAttributes<HTMLSelectElement> & {
    as: "select";
    options: { value: string; label: string }[];
  };

type FormFieldProps = InputFieldProps | TextareaFieldProps | SelectFieldProps;

export default function FormField(props: FormFieldProps) {
  const { label, error, icon, className, as, required, ...rest } = props as any;

  const baseClasses = clsx(
    "flex items-center gap-2 border rounded-full px-5 py-3 bg-[#F5F5F5] transition-all duration-200 focus-within:ring-2 focus-within:ring-primary focus-within:border-transparent",
    {
      "border-gray-200": !error,
      "border-red-500": error,
    },
    className
  );

  const renderLabel = label ? (
    <label htmlFor={props.id} className="text-sm font-medium text-gray-700">
      {label}{" "}
      {required ? (
        <span className="text-red-500">*</span>
      ) : (
        <span className="text-gray-400 text-sm">(optional)</span>
      )}
    </label>
  ) : null;

  return (
    <div className="w-full flex flex-col gap-2">
      {renderLabel}

      {as === "textarea" ? (
        <div className={clsx(baseClasses, "rounded-lg py-2 px-3")}>
          {icon && <span className="text-gray-400 text-lg">{icon}</span>}
          <textarea
            {...(rest as TextareaHTMLAttributes<HTMLTextAreaElement>)}
            className={clsx(
              "w-full outline-none bg-transparent text-base text-gray-800 placeholder-gray-400 resize-none",
              (rest as TextareaHTMLAttributes<HTMLTextAreaElement>).disabled &&
                "cursor-not-allowed opacity-70"
            )}
          />
        </div>
      ) : as === "select" ? (
        <div className={baseClasses}>
          {icon && <span className="text-gray-400 text-lg">{icon}</span>}
          <select
            {...(rest as SelectHTMLAttributes<HTMLSelectElement>)}
            className={clsx(
              "w-full outline-none bg-transparent text-base text-gray-800 placeholder-gray-400 cursor-pointer",
              (rest as SelectHTMLAttributes<HTMLSelectElement>).disabled &&
                "cursor-not-allowed opacity-70"
            )}>
            {(props as SelectFieldProps).options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      ) : (
        <div className={baseClasses}>
          {icon && <span className="text-gray-400 text-lg">{icon}</span>}
          <input
            {...(rest as InputHTMLAttributes<HTMLInputElement>)}
            className={clsx(
              "w-full outline-none bg-transparent text-base text-gray-800 placeholder-gray-400",
              (rest as InputHTMLAttributes<HTMLInputElement>).disabled &&
                "cursor-not-allowed opacity-70"
            )}
          />
        </div>
      )}

      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}
