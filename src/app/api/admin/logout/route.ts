import { getAdminSession } from "@/lib/session";
import { jsonError, requireSameOrigin } from "@/lib/http";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const originError = requireSameOrigin(request);
  if (originError) {
    return originError;
  }

  const session = await getAdminSession();
  session.destroy();
  return NextResponse.json({ ok: true });
}
