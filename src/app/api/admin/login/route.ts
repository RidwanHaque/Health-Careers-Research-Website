import { adminConfigured, getAdminSession, passwordMatches } from "@/lib/session";
import { clientIp } from "@/lib/origin";
import { rateLimit } from "@/lib/rate-limit";
import { adminLoginSchema, firstError } from "@/lib/validation";
import { jsonError, requireSameOrigin } from "@/lib/http";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const originError = requireSameOrigin(request);
  if (originError) {
    return originError;
  }

  if (!adminConfigured()) {
    return jsonError("Admin login is not configured on this server.", 503);
  }

  const limited = rateLimit(`admin:${clientIp(request)}`, 5, 15 * 60 * 1000);
  if (!limited.ok) {
    return jsonError("Too many login tries. Wait and try again.", 429, {
      retryAfterSec: limited.retryAfterSec,
    });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return jsonError("Send the password as JSON.", 400);
  }

  const parsed = adminLoginSchema.safeParse(body);
  if (!parsed.success) {
    return jsonError(firstError(parsed.error), 400);
  }

  if (!passwordMatches(parsed.data.password)) {
    return jsonError("That password did not match.", 401);
  }

  const session = await getAdminSession();
  session.admin = true;
  await session.save();
  return NextResponse.json({ ok: true });
}
