import PageHeader from "@/components/ui/PageHeader";
import DataTable from "@/components/ui/Table";

export default function TemplatesPage() {
  const columns = [
    { key: "id", label: "ID" },
    { key: "name", label: "Template Name" },
    { key: "type", label: "Type" },
    { key: "priority", label: "Priority" },
    { key: "isActive", label: "Active" },
    { key: "variables", label: "Variables" },
  ];

  const data = [
    {
      id: "1",
      name: "Welcome Email",
      type: "SYSTEM",
      priority: "high",
      isActive: true,
      variables: ["userName"],
    },
    {
      id: "2",
      name: "Transaction Alert",
      type: "TRANSACTION",
      priority: "medium",
      isActive: true,
      variables: ["amount", "date"],
    },
  ];

  return (
    <>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Notification Templates</h1>
        <p className="text-sm text-gray-500 mt-1">
          Manage reusable notification templates
        </p>
      </div>
      <PageHeader
        buttonText="Create Template"
        buttonHref="/dashboard/notifications/templates/new"
      />
      <DataTable columns={columns} data={data} />
    </>
  );
}
