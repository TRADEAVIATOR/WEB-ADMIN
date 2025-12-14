import PageHeader from "@/components/ui/PageHeader";
import DataTable from "@/components/ui/Table";

export default function ScheduledPage() {
  const columns = [
    { key: "id", label: "ID" },
    { key: "title", label: "Title" },
    { key: "type", label: "Type" },
    { key: "scheduledFor", label: "Scheduled For" },
    { key: "status", label: "Status" },
    { key: "isRecurring", label: "Recurring" },
  ];

  const data = [
    {
      id: "1",
      title: "Monthly Newsletter",
      type: "PROMOTION",
      scheduledFor: "2025-12-20T10:00:00Z",
      status: "PENDING",
      isRecurring: true,
      recurringPattern: "monthly",
    },
    {
      id: "2",
      title: "Security Update",
      type: "SECURITY",
      scheduledFor: "2025-12-15T14:00:00Z",
      status: "PENDING",
      isRecurring: false,
    },
  ];

  return (
    <>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Scheduled Notifications</h1>
        <p className="text-sm text-gray-500 mt-1">
          Schedule notifications for future delivery
        </p>
      </div>
      <PageHeader
        buttonText="Schedule New"
        buttonHref="/dashboard/notifications/scheduled/new"
      />
      <DataTable columns={columns} data={data} />
    </>
  );
}
