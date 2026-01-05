import PageHeader from "@/components/ui/PageHeader";
import ResultState from "@/components/ui/ResultState";
import ConversationClient from "./ConversationClient";
import { getConversation } from "@/lib/api/support";

export const dynamic = "force-dynamic";

export default async function ConversationPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const res = await getConversation(id);

  if (!res || res.error || !res.data) {
    return <ResultState type="error" message="Unable to fetch conversation." />;
  }

  return (
    <>
      <PageHeader
        title="Support Conversation"
        description="View and respond to customer support messages"
        showBackButton
      />
      <ConversationClient conversation={res.data.data} />
    </>
  );
}
