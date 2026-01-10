import PageHeader from "@/components/ui/PageHeader";
import DataTableClient from "./DataTableClient";
import { getRecurringPatterns } from "@/lib/api/notifications";
import ResultState from "@/components/ui/ResultState";

export const dynamic = "force-dynamic";

export default async function RecurringPatternsPage() {
  const res = await getRecurringPatterns();

  if (!res || res.error) {
    return (
      <ResultState
        type="error"
        message="Unable to fetch recurring patterns."
        showRefresh
      />
    );
  }

  const data = res.data.data;

  if (!data || data.length === 0) {
    return <ResultState type="empty" message="No recurring patterns found." />;
  }

  return (
    <>
      <PageHeader
        title="Recurring Patterns"
        description="Manage available recurring notification patterns"
        showBackButton
      />
      <DataTableClient initialData={data} initialPage={1} totalPages={1} />
    </>
  );
}
