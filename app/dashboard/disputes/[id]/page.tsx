import { getDispute } from "@/lib/api/disputes";
import DisputeDetailsClient from "./DisputeDetailsClient";
import ResultState from "@/components/ui/ResultState";

export const dynamic = "force-dynamic";

export default async function DisputeDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const res = await getDispute(id);

  if (!res || res.error) {
    return (
      <ResultState type="error" message="Unable to fetch dispute details." />
    );
  }

  const dispute = res.data?.data;

  if (!dispute) {
    return (
      <ResultState
        type="error"
        message="Invalid server response. Please try again later."
      />
    );
  }

  return <DisputeDetailsClient dispute={dispute} />;
}
