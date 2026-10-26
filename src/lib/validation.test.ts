import { describe, expect, it } from "vitest";
import { firstError, pollVoteSchema, questionSchema, subscribeSchema } from "./validation";

describe("pollVoteSchema", () => {
  it("accepts a known career", () => {
    expect(pollVoteSchema.parse({ careerId: "pharmacist" }).careerId).toBe("pharmacist");
  });

  it("rejects an unknown career", () => {
    const result = pollVoteSchema.safeParse({ careerId: "astronaut" });
    expect(result.success).toBe(false);
  });
});

describe("questionSchema", () => {
  it("requires a parent email for children under 13", () => {
    const result = questionSchema.safeParse({
      ageBand: "under13",
      email: "kid@example.com",
      question: "What does a pharmacist do all day?",
      careerId: "pharmacist",
      consent: true,
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(firstError(result.error)).toMatch(/parent or guardian/i);
    }
  });

  it("accepts a teen question with a reply email", () => {
    const result = questionSchema.safeParse({
      displayName: "Sam",
      ageBand: "teen",
      email: "sam@example.com",
      careerId: "general",
      question: "How long is PA school after college?",
      consent: true,
    });
    expect(result.success).toBe(true);
  });
});

describe("subscribeSchema", () => {
  it("rejects signups without age confirmation", () => {
    const result = subscribeSchema.safeParse({
      email: "adult@example.com",
      role: "parent",
      consent: true,
    });
    expect(result.success).toBe(false);
  });

  it("accepts a complete parent signup", () => {
    const result = subscribeSchema.safeParse({
      email: "adult@example.com",
      role: "parent",
      ageConfirmed: true,
      consent: true,
    });
    expect(result.success).toBe(true);
  });
});
