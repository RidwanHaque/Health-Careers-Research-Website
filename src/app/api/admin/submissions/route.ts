import { getAdminSession } from "@/lib/session";
import { getStore } from "@/lib/store";
import { jsonError } from "@/lib/http";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function GET() {
  const session = await getAdminSession();
  if (!session.admin) {
    return jsonError("Sign in to view submissions.", 401);
  }

  const data = await getStore();
  return NextResponse.json({
    ok: true,
    poll: data.poll,
    questions: data.questions.slice().reverse(),
    subscribers: data.subscribers.slice().reverse(),
  });
}
