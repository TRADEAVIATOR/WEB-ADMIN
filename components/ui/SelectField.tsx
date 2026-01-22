import { ReactNode } from "react";
import Select, {
  ActionMeta,
  MultiValue,
  SingleValue,
  Props as ReactSelectProps,
} from "react-select";
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
  disabled?: boolean;
};

type ExtraProps = Partial<
  Pick<
    ReactSelectProps<SelectOption, boolean>,
    "isLoading" | "onInputChange" | "onMenuScrollToBottom"
  >
>;

type SingleSelectProps = {
  isMulti?: false;
  value?: SingleValue<SelectOption>;
  defaultValue?: SingleValue<SelectOption>;
  onChange?: (
    value: SingleValue<SelectOption>,
    actionMeta: ActionMeta<SelectOption>,
  ) => void;
} & ExtraProps;

type MultiSelectProps = {
  isMulti: true;
  value?: MultiValue<SelectOption>;
  defaultValue?: MultiValue<SelectOption>;
  onChange?: (
    value: MultiValue<SelectOption>,
    actionMeta: ActionMeta<SelectOption>,
  ) => void;
} & ExtraProps;

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
  disabled,
  value,
  defaultValue,
  onChange,
  isMulti,
  isLoading,
  onInputChange,
  onMenuScrollToBottom,
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
          "flex items-center gap-2 border rounded-full px-5 py-3 transition-all duration-200",
          {
            "bg-[#F5F5F5] focus-within:ring-2 focus-within:ring-primary focus-within:border-transparent":
              !disabled,
            "bg-gray-100 opacity-60 cursor-not-allowed": disabled,
            "border-gray-200": !error,
            "border-red-500": error,
          },
          className,
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
          menuPlacement="auto"
          menuPosition="fixed"
          isDisabled={disabled}
          onChange={(val, meta) => {
            if (!onChange || disabled) return;
            if (isMulti) {
              onChange(val as MultiValue<SelectOption>, meta);
            } else {
              onChange(val as SingleValue<SelectOption>, meta);
            }
          }}
          className="flex-1 text-gray-800 bg-transparent"
          classNamePrefix="react-select"
          isLoading={isLoading}
          onInputChange={onInputChange}
          onMenuScrollToBottom={onMenuScrollToBottom}
          styles={{
            control: (provided) => ({
              ...provided,
              minHeight: "auto",
              height: "auto",
              border: "none",
              boxShadow: "none",
              background: "transparent",
              cursor: disabled ? "not-allowed" : "default",
            }),
            placeholder: (provided) => ({
              ...provided,
              color: "#9CA3AF",
              fontSize: "1rem",
            }),
            singleValue: (provided) => ({
              ...provided,
              color: "#111827",
              fontSize: "1rem",
            }),
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
              fontSize: "1rem",
            }),
            indicatorsContainer: (provided) => ({
              ...provided,
              height: "auto",
            }),
            valueContainer: (provided) => ({
              ...provided,
              padding: 0,
            }),
            dropdownIndicator: (provided) => ({
              ...provided,
              padding: 4,
            }),
            indicatorSeparator: () => ({ display: "none" }),
          }}
        />
      </div>

      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}
