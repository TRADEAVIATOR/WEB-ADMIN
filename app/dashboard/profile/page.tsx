import ResultState from "@/components/ui/ResultState";
import AdminProfileClient from "./AdminProfileClient";
import { getAdminProfile } from "@/lib/api/auth";

export const dynamic = "force-dynamic";

export default async function AdminProfilePage() {
  const res = await getAdminProfile();

  if (!res || res.error) {
    return (
      <ResultState
        type="error"
        message="Unable to fetch admin profile. Please try again later."
        showRefresh
      />
    );
  }

  const admin = res.data?.admin;

  if (!admin) {
    return <ResultState type="error" message="Admin profile not found." />;
  }

  return <AdminProfileClient admin={admin} />;
}
