import { getCustomers } from "@/lib/api/customers";
import SelectField, { SelectOption } from "../ui/SelectField";
import { useEffect, useState } from "react";

export function SingleUserSelect({
  value,
  onChange,
}: {
  value: SelectOption | null;
  onChange: (user: SelectOption | null) => void;
}) {
  const [options, setOptions] = useState<SelectOption[]>([]);

  useEffect(() => {
    getCustomers(1, 100).then((res: any) => {
      const opts: SelectOption[] =
        res?.data?.customers?.map((c: any) => ({
          value: c.id,
          label: `${c.fullname} (${c.email})`,
        })) || [];
      setOptions(opts);
    });
  }, []);

  return (
    <SelectField
      id="single-user"
      label="Select User"
      options={options}
      value={value}
      onChange={(val) => onChange(val as any)}
      placeholder="Select a user"
      isMulti={false}
    />
  );
}
