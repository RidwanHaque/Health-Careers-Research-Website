import { describe, expect, it } from "vitest";
import { isSameOrigin } from "./origin";

describe("isSameOrigin", () => {
  it("accepts a matching origin and host", () => {
    const request = new Request("http://localhost:3000/api/poll", {
      method: "POST",
      headers: { origin: "http://localhost:3000", host: "localhost:3000" },
    });
    expect(isSameOrigin(request)).toBe(true);
  });

  it("rejects a cross-site origin", () => {
    const request = new Request("http://localhost:3000/api/poll", {
      method: "POST",
      headers: { origin: "https://evil.example", host: "localhost:3000" },
    });
    expect(isSameOrigin(request)).toBe(false);
  });
});
