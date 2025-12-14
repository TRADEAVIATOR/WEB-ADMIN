import PageHeader from "@/components/ui/PageHeader";
import DataTable from "@/components/ui/Table";

export default function HistoryPage() {
  const columns = [
    { key: "id", label: "ID" },
    { key: "title", label: "Title" },
    { key: "type", label: "Type" },
    { key: "priority", label: "Priority" },
    { key: "isRead", label: "Read Status" },
    { key: "createdAt", label: "Created At" },
    { key: "recipients", label: "Recipients" },
  ];

  const data = [
    {
      id: "1",
      title: "Payment Received",
      type: "TRANSACTION",
      priority: "medium",
      isRead: true,
      createdAt: "2025-12-13",
      recipients: 1250,
    },
    {
      id: "2",
      title: "Security Alert",
      type: "SECURITY",
      priority: "high",
      isRead: false,
      createdAt: "2025-12-13",
      recipients: 5420,
    },
  ];

  return (
    <>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Notification History</h1>
        <p className="text-sm text-gray-500 mt-1">
          View all sent notifications and their performance
        </p>
      </div>
      <PageHeader />
      <DataTable columns={columns} data={data} />
    </>
  );
}
