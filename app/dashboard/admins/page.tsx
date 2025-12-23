import PageHeader from "@/components/ui/PageHeader";
import DataTableClient from "./DataTableClient";
import { FiPlus } from "react-icons/fi";

export default function SettingsPage() {
  return (
    <>
      <PageHeader
        title="Administrators"
        description="Manage your platform administrators and their roles"
        buttonIcon={<FiPlus size={16} />}
        buttonText="Add new administrator"
        modalTypeToOpen="add-new-administrator"
      />

      <DataTableClient />
    </>
  );
}
