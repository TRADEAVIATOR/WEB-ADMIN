import ResultState from "@/components/ui/ResultState";
import AdminProfileClient from "./AdminProfileClient";
import { getAdminProfile } from "@/lib/api/auth";
import { getNotificationPreferences } from "@/lib/api/notifications";

export const dynamic = "force-dynamic";

export default async function AdminProfilePage() {
  const adminRes = await getAdminProfile();

  if (!adminRes || adminRes.error) {
    return (
      <ResultState
        type="error"
        message="Unable to fetch admin profile. Please try again later."
        showRefresh
      />
    );
  }

  const admin = adminRes.data?.admin;

  if (!admin) {
    return <ResultState type="error" message="Admin profile not found." />;
  }

  const prefRes = await getNotificationPreferences(admin.id);
  const preferences = prefRes?.data?.data || null;

  return <AdminProfileClient admin={admin} initialPreferences={preferences} />;
}
