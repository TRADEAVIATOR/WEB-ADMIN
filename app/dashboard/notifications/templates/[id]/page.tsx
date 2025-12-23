import ResultState from "@/components/ui/ResultState";
import { getNotificationTemplate } from "@/lib/api/notifications";
import TemplateDetailsClient from "./TemplateDetailsClient";

export const dynamic = "force-dynamic";

export default async function NotificationTemplateDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const res = await getNotificationTemplate(id);

  if (!res || res.error) {
    return (
      <ResultState
        type="error"
        message="Unable to fetch notification template."
      />
    );
  }

  const template = res.data?.data;

  if (!template) {
    return (
      <ResultState
        type="error"
        message="Invalid server response. Please try again later."
      />
    );
  }

  return <TemplateDetailsClient template={template} />;
}
