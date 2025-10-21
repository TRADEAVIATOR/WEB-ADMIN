import PageHeader from "@/components/ui/PageHeader";
import DataTableClient from "./DataTableClient";
import { FiPlus } from "react-icons/fi";

export default function SettingsPage() {
  return (
    <>
      <PageHeader
        buttonIcon={<FiPlus size={16} />}
        buttonText="Add new adminstrator"
        modalTypeToOpen="add-new-administrator"
      />
      <DataTableClient />
    </>
  );
}
