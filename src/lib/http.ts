import { NextResponse } from "next/server";
import { isSameOrigin } from "./origin";

export function jsonError(message: string, status: number, extra?: Record<string, unknown>) {
  return NextResponse.json({ ok: false, error: message, ...extra }, { status });
}

export function requireSameOrigin(request: Request) {
  if (request.method !== "GET" && request.method !== "HEAD" && !isSameOrigin(request)) {
    return jsonError("This request could not be verified. Refresh the page and try again.", 403);
  }
  return null;
}
