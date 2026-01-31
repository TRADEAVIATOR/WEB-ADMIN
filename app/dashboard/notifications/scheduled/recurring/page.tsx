import PageHeader from "@/components/ui/PageHeader";
import DataTableClient from "./DataTableClient";
import { getRecurringPatterns } from "@/lib/api/notifications";
import ResultState from "@/components/ui/ResultState";

export const dynamic = "force-dynamic";

export default async function RecurringPatternsPage() {
  const res = await getRecurringPatterns();

  let content;

  if (!res || res.error) {
    content = (
      <ResultState
        type="error"
        message="Unable to fetch recurring patterns."
        showRefresh
      />
    );
  } else {
    const data = res.data?.data;

    if (!data || data.length === 0) {
      content = (
        <ResultState type="empty" message="No recurring patterns found." />
      );
    } else {
      content = (
        <DataTableClient initialData={data} initialPage={1} totalPages={1} />
      );
    }
  }

  return (
    <>
      <PageHeader
        title="Recurring Patterns"
        description="Manage available recurring notification patterns"
        showBackButton
      />
      {content}
    </>
  );
}
