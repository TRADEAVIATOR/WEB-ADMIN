import PageHeader from "@/components/ui/PageHeader";
import DataTableClient from "./DataTableClient";
import { getTickets } from "@/lib/api/tickets";
import ResultState from "@/components/ui/ResultState";
import { TicketsResponse } from "@/types/api";

export const dynamic = "force-dynamic";

export default async function TicketsPage({
  searchParams,
}: {
  searchParams?: Promise<{ page?: string }>;
}) {
  const params = await searchParams;
  const page = params?.page ? Number(params.page) : 1;

  const res = await getTickets(page, 50);

  if (!res || res.error) {
    return (
      <ResultState
        type="error"
        message="Unable to fetch tickets."
        showRefresh
      />
    );
  }

  const payload = res.data as TicketsResponse | undefined;

  if (!payload) {
    return (
      <ResultState
        type="error"
        message="Invalid server response. Please try again later."
      />
    );
  }

  if (!payload.results || payload.results.length === 0) {
    return <ResultState type="empty" message="No tickets found." />;
  }

  return (
    <>
      <PageHeader
        title="Tickets"
        description="View and manage event tickets, sales, and availability"
      />
      <DataTableClient
        initialData={payload.results}
        initialPage={payload.pagination.currentPage}
        totalPages={payload.pagination.totalPages}
      />
    </>
  );
}
