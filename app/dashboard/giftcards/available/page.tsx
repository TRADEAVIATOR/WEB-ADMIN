import PageHeader from "@/components/ui/PageHeader";
import { FiRefreshCw } from "react-icons/fi";
import DataTableClient from "./DataTableClient";

export default function SettingsPage() {
  return (
    <>
      <h1 className="text-3xl font-semibold mb-6 tracking-tight">
        <span className="text-primary">Buying</span>{" "}
        <span className="text-gray-700">Selling</span>
      </h1>
      <PageHeader
        buttonIcon={<FiRefreshCw size={16} />}
        buttonText="Sync from Reloadly"
        modalTypeToOpen="add-new-administrator"
      />
      <DataTableClient />
    </>
  );
}
