import { addSubscriber } from "@/lib/store";
import { clientIp } from "@/lib/origin";
import { rateLimit } from "@/lib/rate-limit";
import { firstError, subscribeSchema } from "@/lib/validation";
import { jsonError, requireSameOrigin } from "@/lib/http";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const originError = requireSameOrigin(request);
  if (originError) {
    return originError;
  }

  const limited = rateLimit(`subscribe:${clientIp(request)}`, 5, 60 * 60 * 1000);
  if (!limited.ok) {
    return jsonError("Please wait before trying another signup.", 429, {
      retryAfterSec: limited.retryAfterSec,
    });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return jsonError("Send the form as JSON.", 400);
  }

  const parsed = subscribeSchema.safeParse(body);
  if (!parsed.success) {
    return jsonError(firstError(parsed.error), 400);
  }

  const { subscriber, created } = await addSubscriber({
    email: parsed.data.email,
    role: parsed.data.role,
  });

  return NextResponse.json({
    ok: true,
    created,
    message: created
      ? "You are on the list. This project does not send automatic emails yet; your address was saved so the author can share opportunities later."
      : "That email is already on the list.",
    id: subscriber.id,
  });
}
