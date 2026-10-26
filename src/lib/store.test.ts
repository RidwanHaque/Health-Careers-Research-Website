import { mkdtemp, rm } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { addSubscriber, getStore, voteInPoll } from "./store";

describe("store", () => {
  let dir = "";

  beforeEach(async () => {
    dir = await mkdtemp(path.join(os.tmpdir(), "hce-"));
    process.env.DATA_STORE_PATH = path.join(dir, "store.json");
  });

  afterEach(async () => {
    await rm(dir, { recursive: true, force: true });
    delete process.env.DATA_STORE_PATH;
  });

  it("increments poll counts", async () => {
    await voteInPoll("nurse");
    await voteInPoll("nurse");
    const data = await getStore();
    expect(data.poll.nurse).toBe(2);
    expect(data.poll.physician).toBe(0);
  });

  it("does not duplicate the same subscriber email", async () => {
    const first = await addSubscriber({ email: "a@example.com", role: "teacher" });
    const second = await addSubscriber({ email: "A@example.com", role: "parent" });
    expect(first.created).toBe(true);
    expect(second.created).toBe(false);
    expect((await getStore()).subscribers).toHaveLength(1);
  });
});
