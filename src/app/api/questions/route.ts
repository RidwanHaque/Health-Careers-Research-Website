import { addQuestion } from "@/lib/store";
import { clientIp } from "@/lib/origin";
import { rateLimit } from "@/lib/rate-limit";
import { firstError, questionSchema } from "@/lib/validation";
import { jsonError, requireSameOrigin } from "@/lib/http";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const originError = requireSameOrigin(request);
  if (originError) {
    return originError;
  }

  const limited = rateLimit(`question:${clientIp(request)}`, 5, 60 * 60 * 1000);
  if (!limited.ok) {
    return jsonError("Please wait before sending another question.", 429, {
      retryAfterSec: limited.retryAfterSec,
    });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return jsonError("Send the form as JSON.", 400);
  }

  const parsed = questionSchema.safeParse(body);
  if (!parsed.success) {
    return jsonError(firstError(parsed.error), 400);
  }

  const value = parsed.data;
  const replyEmail = value.ageBand === "under13" ? value.parentEmail! : value.email!;

  await addQuestion({
    displayName: value.displayName?.trim() || "Anonymous",
    ageBand: value.ageBand,
    replyEmail,
    careerId: value.careerId,
    question: value.question,
  });

  return NextResponse.json({
    ok: true,
    message:
      "Your question was saved. Rayan reads these messages and will reply by email when an answer is ready.",
  });
}
