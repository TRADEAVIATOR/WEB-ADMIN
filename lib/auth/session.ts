import { getServerSession } from "next-auth/next";
import { authOptions } from "./options";
import { redirect } from "next/navigation";

export async function auth() {
  return await getServerSession(authOptions);
}

export async function requireAuth() {
  const session = await auth();

  if (!session) {
    redirect("/");
  }

  return session;
}

export async function requireRole(role: "admin" | "superAdmin") {
  const session = await requireAuth();

  if (session.user.role !== role) {
    redirect("/");
  }

  return session;
}
