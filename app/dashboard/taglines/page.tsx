import DataTableClient from "./DataTableClient";
import ResultState from "@/components/ui/ResultState";
import { getTaglines } from "@/lib/api/taglines";

export const dynamic = "force-dynamic";

export default async function TaglinesPage({
  searchParams,
}: {
  searchParams?: Promise<{ page?: string }>;
}) {
  const params = await searchParams;
  const page = params?.page ? Number(params.page) : 1;

  const res = await getTaglines();

  if (!res || res.error || !res.data) {
    return <ResultState type="error" message="Unable to fetch taglines." />;
  }

  const taglines = res.data.data.taglines || [];

  if (!taglines || taglines.length === 0) {
    return <ResultState type="empty" message="No taglines found." />;
  }

  return (
    <>
      <DataTableClient initialData={taglines} initialPage={page} />
    </>
  );
}
