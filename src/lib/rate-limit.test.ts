import { describe, expect, it } from "vitest";
import { rateLimit, resetRateLimits } from "./rate-limit";

describe("rateLimit", () => {
  it("allows traffic under the limit and blocks after it", () => {
    resetRateLimits();
    const now = 1_000_000;
    expect(rateLimit("t", 2, 1000, now).ok).toBe(true);
    expect(rateLimit("t", 2, 1000, now + 1).ok).toBe(true);
    const blocked = rateLimit("t", 2, 1000, now + 2);
    expect(blocked.ok).toBe(false);
  });

  it("resets after the window", () => {
    resetRateLimits();
    const now = 1_000_000;
    rateLimit("w", 1, 1000, now);
    expect(rateLimit("w", 1, 1000, now + 1000).ok).toBe(true);
  });
});
