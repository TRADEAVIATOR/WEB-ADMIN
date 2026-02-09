import PageHeader from "@/components/ui/PageHeader";
import DataTableClient from "./DataTableClient";
import { getTickets } from "@/lib/api/tickets";
import ResultState from "@/components/ui/ResultState";

export const dynamic = "force-dynamic";

export default async function TicketsPage({
  searchParams,
}: {
  searchParams?: Promise<{ page?: string }>;
}) {
  const params = await searchParams;
  const page = params?.page ? Number(params.page) : 1;

  const response = await getTickets(page, 50);

  let content;

  if (!response || response.error) {
    content = (
      <ResultState
        type="error"
        message="Unable to fetch tickets."
        showRefresh
      />
    );
  } else {
    const { data, meta } = response.data;

    if (!data) {
      content = (
        <ResultState
          type="error"
          message="Invalid server response. Please try again later."
        />
      );
    } else if (!data || data.length === 0) {
      content = <ResultState type="empty" message="No tickets found." />;
    } else {
      content = (
        <DataTableClient
          initialData={data}
          totalPages={meta.totalPages}
          initialPage={meta.page}
        />
      );
    }
  }

  return (
    <>
      <PageHeader
        title="Tickets"
        description="View and manage event tickets, sales, and availability"
      />
      {content}
    </>
  );
}
