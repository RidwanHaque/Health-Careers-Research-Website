import { mkdir, readFile, rename, writeFile } from "node:fs/promises";
import path from "node:path";
import { careerIds, type CareerId } from "./careers";

export type PollCounts = Record<CareerId, number>;

export type StoredQuestion = {
  id: string;
  createdAt: string;
  displayName: string;
  ageBand: "under13" | "teen" | "adult";
  replyEmail: string;
  careerId: string;
  question: string;
};

export type StoredSubscriber = {
  id: string;
  createdAt: string;
  email: string;
  role: "parent" | "teacher" | "student";
};

export type StoreData = {
  poll: PollCounts;
  questions: StoredQuestion[];
  subscribers: StoredSubscriber[];
};

const defaultPoll = (): PollCounts =>
  Object.fromEntries(careerIds.map((id) => [id, 0])) as PollCounts;

export const emptyStore = (): StoreData => ({
  poll: defaultPoll(),
  questions: [],
  subscribers: [],
});

let queue: Promise<unknown> = Promise.resolve();

function withLock<T>(work: () => Promise<T>): Promise<T> {
  const run = queue.then(work, work);
  queue = run.then(
    () => undefined,
    () => undefined,
  );
  return run;
}

function storePath() {
  return process.env.DATA_STORE_PATH ?? path.join(process.cwd(), "data", "store.json");
}

function normalize(raw: Partial<StoreData> | null): StoreData {
  const base = emptyStore();
  if (!raw) {
    return base;
  }
  for (const id of careerIds) {
    const value = raw.poll?.[id];
    base.poll[id] = typeof value === "number" && Number.isFinite(value) && value >= 0 ? Math.floor(value) : 0;
  }
  base.questions = Array.isArray(raw.questions) ? raw.questions : [];
  base.subscribers = Array.isArray(raw.subscribers) ? raw.subscribers : [];
  return base;
}

async function readStore(): Promise<StoreData> {
  try {
    const text = await readFile(storePath(), "utf8");
    return normalize(JSON.parse(text) as Partial<StoreData>);
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") {
      return emptyStore();
    }
    throw error;
  }
}

async function writeStore(data: StoreData) {
  const file = storePath();
  await mkdir(path.dirname(file), { recursive: true });
  const temp = `${file}.${process.pid}.tmp`;
  await writeFile(temp, `${JSON.stringify(data, null, 2)}\n`, { encoding: "utf8", mode: 0o600 });
  await rename(temp, file);
}

export async function getStore(): Promise<StoreData> {
  return withLock(readStore);
}

export async function voteInPoll(careerId: CareerId): Promise<PollCounts> {
  return withLock(async () => {
    const data = await readStore();
    data.poll[careerId] = (data.poll[careerId] ?? 0) + 1;
    await writeStore(data);
    return data.poll;
  });
}

export async function addQuestion(input: Omit<StoredQuestion, "id" | "createdAt">): Promise<StoredQuestion> {
  return withLock(async () => {
    const data = await readStore();
    const record: StoredQuestion = {
      ...input,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
    };
    data.questions.push(record);
    await writeStore(data);
    return record;
  });
}

export async function addSubscriber(
  input: Omit<StoredSubscriber, "id" | "createdAt">,
): Promise<{ subscriber: StoredSubscriber; created: boolean }> {
  return withLock(async () => {
    const data = await readStore();
    const existing = data.subscribers.find(
      (entry) => entry.email.toLowerCase() === input.email.toLowerCase(),
    );
    if (existing) {
      return { subscriber: existing, created: false };
    }
    const subscriber: StoredSubscriber = {
      ...input,
      email: input.email.toLowerCase(),
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
    };
    data.subscribers.push(subscriber);
    await writeStore(data);
    return { subscriber, created: true };
  });
}
