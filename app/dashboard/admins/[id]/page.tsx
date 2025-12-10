"use client";

import DetailLayout from "@/components/layout/DetailLayout";
import AdminDetailsHeader from "./components/AdminDetailsHeader";
import PermissionsTab from "./components/PermissionsTab";
import RecentActivityTab from "./components/RecentActivityTab";

export default function AdminDetailsPage() {
  const tabs = [
    {
      key: "permissions",
      label: "Permissions",
      content: <PermissionsTab />,
    },
    {
      key: "activity",
      label: "Recent Activity",
      content: <RecentActivityTab />,
    },
  ];

  return (
    <DetailLayout
      header={
        <AdminDetailsHeader
          name="Imran Rosheed"
          username="@imran"
          status="Active"
        />
      }
      tabs={tabs}
    />
  );
}
