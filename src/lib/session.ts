import { getIronSession, type SessionOptions } from "iron-session";
import { cookies } from "next/headers";
import { timingSafeEqual } from "node:crypto";

export type AdminSession = {
  admin?: boolean;
};

export type PollSession = {
  votedFor?: string;
};

function sessionPassword(): string {
  const secret = process.env.SESSION_SECRET;
  if (secret && secret.length >= 32) {
    return secret;
  }
  return "local-dev-only-secret-replace-me-32+";
}

function cookieOptions(): Omit<SessionOptions, "cookieName" | "ttl"> {
  return {
    password: sessionPassword(),
    cookieOptions: {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
    },
  };
}

export async function getAdminSession() {
  return getIronSession<AdminSession>(await cookies(), {
    ...cookieOptions(),
    cookieName: "hce_admin",
    ttl: 60 * 60 * 8,
  });
}

export async function getPollSession() {
  return getIronSession<PollSession>(await cookies(), {
    ...cookieOptions(),
    cookieName: "hce_poll",
    ttl: 60 * 60 * 24 * 365,
  });
}

export function adminConfigured(): boolean {
  return Boolean(process.env.ADMIN_PASSWORD);
}

export function passwordMatches(candidate: string): boolean {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) {
    return false;
  }
  const a = Buffer.from(candidate);
  const b = Buffer.from(expected);
  if (a.length !== b.length) {
    const padded = Buffer.alloc(b.length);
    a.copy(padded);
    timingSafeEqual(padded, b);
    return false;
  }
  return timingSafeEqual(a, b);
}
