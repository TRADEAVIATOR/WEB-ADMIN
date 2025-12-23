import EditTemplateClient from "./EditTemplateClient";
import { getNotificationTemplate } from "@/lib/api/notifications";
import ResultState from "@/components/ui/ResultState";

export default async function EditTemplatePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const res = await getNotificationTemplate(id);

  if (!res || res.error) {
    return (
      <ResultState type="error" message="Unable to fetch template details." />
    );
  }

  const template = res.data?.data;

  return <EditTemplateClient template={template} id={id} />;
}
