import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { AdminDashboard } from "@/components/AdminDashboard";
import { getAdminSession } from "@/lib/session";
import { getStore } from "@/lib/store";

export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

export default async function AdminPage() {
  const session = await getAdminSession();
  if (!session.admin) {
    redirect("/admin/login");
  }

  const data = await getStore();
  return (
    <AdminDashboard
      poll={data.poll}
      questions={data.questions.slice().reverse()}
      subscribers={data.subscribers.slice().reverse()}
    />
  );
}
