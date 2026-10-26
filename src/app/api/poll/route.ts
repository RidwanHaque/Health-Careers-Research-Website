import { NextResponse } from "next/server";
import { careerIds, type CareerId } from "@/lib/careers";
import { clientIp } from "@/lib/origin";
import { rateLimit } from "@/lib/rate-limit";
import { getPollSession } from "@/lib/session";
import { getStore, voteInPoll } from "@/lib/store";
import { firstError, pollVoteSchema } from "@/lib/validation";
import { jsonError, requireSameOrigin } from "@/lib/http";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const [data, session] = await Promise.all([getStore(), getPollSession()]);
  return NextResponse.json({
    ok: true,
    counts: data.poll,
    votedFor: session.votedFor ?? null,
    total: careerIds.reduce((sum, id) => sum + (data.poll[id] ?? 0), 0),
  });
}

export async function POST(request: Request) {
  const originError = requireSameOrigin(request);
  if (originError) {
    return originError;
  }

  const limited = rateLimit(`poll:${clientIp(request)}`, 10, 15 * 60 * 1000);
  if (!limited.ok) {
    return jsonError("Please wait before voting again.", 429, { retryAfterSec: limited.retryAfterSec });
  }

  const session = await getPollSession();
  if (session.votedFor) {
    const data = await getStore();
    return jsonError("You already voted in this poll.", 409, {
      counts: data.poll,
      votedFor: session.votedFor,
    });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return jsonError("Send a JSON vote with a careerId.", 400);
  }

  const parsed = pollVoteSchema.safeParse(body);
  if (!parsed.success) {
    return jsonError(firstError(parsed.error), 400);
  }

  const careerId = parsed.data.careerId as CareerId;
  const counts = await voteInPoll(careerId);
  session.votedFor = careerId;
  await session.save();

  return NextResponse.json({ ok: true, counts, votedFor: careerId });
}
