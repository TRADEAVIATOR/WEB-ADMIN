import { ReactNode } from "react";

export default function DetailItem({
  label,
  value,
}: {
  label: string;
  value: string | ReactNode;
}) {
  return (
    <div>
      <p className="text-sm text-gray-500">{label}</p>
      <p className="font-medium text-gray-900 mt-0.5 break-words">
        {value || "—"}
      </p>
    </div>
  );
}
