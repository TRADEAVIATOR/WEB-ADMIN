import PageHeader from "@/components/ui/PageHeader";
import DataTableClient from "./DataTableClient";
import ResultState from "@/components/ui/ResultState";
import { getTaglines } from "@/lib/api/taglines";
import { FiPlus } from "react-icons/fi";

export const dynamic = "force-dynamic";

export default async function TaglinesPage({
  searchParams,
}: {
  searchParams?: Promise<{ page?: string }>;
}) {
  const params = await searchParams;
  const page = params?.page ? Number(params.page) : 1;

  const response = await getTaglines();

  let content;

  if (!response || response.error || !response.data) {
    content = (
      <ResultState
        type="error"
        message="Unable to fetch taglines."
        showRefresh
      />
    );
  } else {
    const { data } = response.data;

    if (data.length === 0) {
      content = <ResultState type="empty" message="No taglines found." />;
    } else {
      content = <DataTableClient initialData={data} initialPage={page} />;
    }
  }

  return (
    <>
      <PageHeader
        buttonIcon={<FiPlus size={16} />}
        buttonText="Add new tagline"
        description="Manage and create reusable taglines for notifications or campaigns"
        modalTypeToOpen="create-tagline"
        title="Taglines"
      />
      {content}
    </>
  );
}
