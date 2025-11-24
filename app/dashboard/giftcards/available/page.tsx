import PageHeader from "@/components/ui/PageHeader";
import { FiRefreshCw } from "react-icons/fi";
import DataTableClient from "./DataTableClient";

export default function SettingsPage() {
  return (
    <>
      <PageHeader
        buttonIcon={<FiRefreshCw size={16} />}
        buttonText="Sync from Reloadly"
        modalTypeToOpen="add-new-administrator"
      />
      <DataTableClient />
    </>
  );
}
