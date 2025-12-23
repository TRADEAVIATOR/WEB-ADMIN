import { useEffect, useState } from "react";
import SelectField, { SelectOption } from "../ui/SelectField";
import { getCustomersClient } from "@/lib/api/customers";

export function MultiUserSelect({
  values,
  onChange,
}: {
  values: SelectOption[];
  onChange: (users: SelectOption[]) => void;
}) {
  const [options, setOptions] = useState<SelectOption[]>([]);

  useEffect(() => {
    getCustomersClient(1, 100).then((res: any) => {
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
      id="multi-user"
      label="Select Users"
      options={options}
      value={values}
      onChange={(val) => onChange(val as any)}
      placeholder="Select users"
      isMulti
    />
  );
}
