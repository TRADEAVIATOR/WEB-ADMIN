"use client";

export default function PermissionsTab() {
  const permissions = [
    "Super Admin",
    "Permission 1",
    "Permission 2",
    "Permission 3",
    "Permission 4",
    "Permission 5",
  ];

  return (
    <div className="space-y-4">
      {permissions.map((perm, index) => (
        <label
          key={index}
          className="flex items-center gap-3 text-sm text-gray-700">
          <input type="checkbox" className="accent-orange-500" />
          {perm}
        </label>
      ))}
    </div>
  );
}
