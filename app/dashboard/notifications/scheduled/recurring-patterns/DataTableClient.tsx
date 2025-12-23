"use client";

import DataTable from "@/components/ui/Table";
import { RowData } from "@/types/common";
import { DataTableClientProps } from "@/types/props";
import Badge from "@/components/ui/Badge";

export default function DataTableClient({
  initialData = [],
}: DataTableClientProps<{
  value: string;
  label: string;
  description: string;
}>) {
  const columns = [
    { key: "label", label: "Label" },
    { key: "value", label: "Value" },
    { key: "description", label: "Description" },
  ];

  const rows: RowData[] = initialData.map((pattern) => ({
    id: pattern.value,
    label: <span>{pattern.label}</span>,
    value: <Badge text={pattern.value} color="blue" />,
    description: pattern.description,
  }));

  return (
    <>
      <DataTable columns={columns} data={rows} />
    </>
  );
}
