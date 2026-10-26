import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { AdminLoginForm } from "@/components/AdminLoginForm";
import { adminConfigured, getAdminSession } from "@/lib/session";

export const metadata: Metadata = {
  title: "Admin login",
  robots: { index: false, follow: false },
};

export default async function AdminLoginPage() {
  const session = await getAdminSession();
  if (session.admin) {
    redirect("/admin");
  }

  return <AdminLoginForm configured={adminConfigured()} />;
}
