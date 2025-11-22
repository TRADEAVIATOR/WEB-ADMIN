import PageHeader from "@/components/ui/PageHeader";
import DataTableClient from "./DataTableClient";
import { getCustomers } from "@/lib/api/customers";

export default async function UsersPage() {
  const res = await getCustomers();
  const initialData = res.data || [];

  return (
    <>
      <PageHeader />
      <DataTableClient initialData={initialData} />
    </>
  );
}
