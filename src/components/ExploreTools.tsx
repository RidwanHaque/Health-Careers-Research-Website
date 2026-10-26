"use client";

import { FormEvent, useEffect, useState } from "react";
import { careers, type CareerId } from "@/lib/careers";

type PollState = {
  counts: Record<string, number>;
  votedFor: string | null;
  total: number;
};

type FormStatus = { type: "idle" } | { type: "loading" } | { type: "error"; message: string } | { type: "ok"; message: string };

async function readApiError(response: Response): Promise<string> {
  try {
    const data = (await response.json()) as { error?: string };
    return data.error ?? "Something went wrong. Please try again.";
  } catch {
    return "Something went wrong. Please try again.";
  }
}

export function ExploreTools() {
  return (
    <section className="explore" id="explore" aria-label="Interactive extras">
      <PollPanel />
      <QuestionForm />
      <SubscribeForm />
      <OlderStudentLinks />
    </section>
  );
}

function PollPanel() {
  const [poll, setPoll] = useState<PollState | null>(null);
  const [status, setStatus] = useState<FormStatus>({ type: "idle" });

  useEffect(() => {
    let cancelled = false;
    fetch("/api/poll")
      .then(async (response) => {
        if (!response.ok) {
          throw new Error(await readApiError(response));
        }
        return response.json() as Promise<{ counts: Record<string, number>; votedFor: string | null; total: number }>;
      })
      .then((data) => {
        if (!cancelled) {
          setPoll({ counts: data.counts, votedFor: data.votedFor, total: data.total });
        }
      })
      .catch((error: Error) => {
        if (!cancelled) {
          setStatus({ type: "error", message: error.message });
        }
      });
    return () => {
      cancelled = true;
    };
  }, []);

  async function vote(careerId: CareerId) {
    if (poll?.votedFor || status.type === "loading") {
      return;
    }
    setStatus({ type: "loading" });
    try {
      const response = await fetch("/api/poll", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ careerId }),
      });
      const data = (await response.json()) as {
        ok?: boolean;
        error?: string;
        counts?: Record<string, number>;
        votedFor?: string;
      };
      if (!response.ok || !data.counts) {
        if (data.counts) {
          setPoll({
            counts: data.counts,
            votedFor: data.votedFor ?? careerId,
            total: Object.values(data.counts).reduce((sum, value) => sum + value, 0),
          });
        }
        throw new Error(data.error ?? "The vote could not be saved.");
      }
      setPoll({
        counts: data.counts,
        votedFor: data.votedFor ?? careerId,
        total: Object.values(data.counts).reduce((sum, value) => sum + value, 0),
      });
      setStatus({ type: "ok", message: "Thanks. Your vote is in." });
    } catch (error) {
      setStatus({ type: "error", message: error instanceof Error ? error.message : "The vote could not be saved." });
    }
  }

  return (
    <section className="panel" aria-labelledby="poll-title">
      <h2 id="poll-title">Which career sounds most interesting?</h2>
      <p className="muted">One vote per browser. Results show after you vote, or if you already voted.</p>
      {poll ? (
        <div>
          {careers.map((career) => {
            const count = poll.counts[career.id] ?? 0;
            const percent = poll.total ? Math.round((count / poll.total) * 100) : 0;
            const voted = Boolean(poll.votedFor);
            return (
              <div className="poll-option" key={career.id}>
                <button
                  type="button"
                  className="secondary"
                  disabled={voted || status.type === "loading"}
                  onClick={() => vote(career.id)}
                >
                  {career.name}
                </button>
                {voted ? (
                  <>
                    <div className="bar" aria-hidden="true">
                      <span style={{ width: `${percent}%`, background: career.accent }} />
                    </div>
                    <span className="muted">
                      {count} vote{count === 1 ? "" : "s"} ({percent}%)
                    </span>
                  </>
                ) : null}
              </div>
            );
          })}
        </div>
      ) : status.type === "error" ? null : (
        <p className="status info">Loading the poll…</p>
      )}
      {status.type === "error" ? <p className="status error">{status.message}</p> : null}
      {status.type === "ok" ? <p className="status ok">{status.message}</p> : null}
    </section>
  );
}

function QuestionForm() {
  const [status, setStatus] = useState<FormStatus>({ type: "idle" });
  const [ageBand, setAgeBand] = useState("teen");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status.type === "loading") {
      return;
    }
    const form = event.currentTarget;
    const data = new FormData(form);
    setStatus({ type: "loading" });
    try {
      const response = await fetch("/api/questions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          displayName: String(data.get("displayName") ?? ""),
          ageBand: String(data.get("ageBand") ?? ""),
          email: String(data.get("email") ?? ""),
          parentEmail: String(data.get("parentEmail") ?? ""),
          careerId: String(data.get("careerId") ?? "general"),
          question: String(data.get("question") ?? ""),
          consent: data.get("consent") === "on",
        }),
      });
      const payload = (await response.json()) as { ok?: boolean; error?: string; message?: string };
      if (!response.ok || !payload.ok) {
        throw new Error(payload.error ?? "The question could not be saved.");
      }
      form.reset();
      setAgeBand("teen");
      setStatus({ type: "ok", message: payload.message ?? "Your question was saved." });
    } catch (error) {
      setStatus({
        type: "error",
        message: error instanceof Error ? error.message : "The question could not be saved.",
      });
    }
  }

  return (
    <section className="panel" aria-labelledby="ask-title">
      <h2 id="ask-title">Ask Rayan a question</h2>
      <p className="muted">
        If you have a question about one of these jobs, send it here. Rayan Haque, the student author,
        reads these messages and can email a professional when a careful answer is needed.
      </p>
      <form onSubmit={onSubmit} noValidate>
        <label className="field">
          <span>Name or nickname (optional)</span>
          <input name="displayName" maxLength={80} autoComplete="nickname" />
        </label>
        <label className="field">
          <span>I am</span>
          <select name="ageBand" value={ageBand} onChange={(event) => setAgeBand(event.target.value)}>
            <option value="under13">Under 13 (a parent or guardian should send this)</option>
            <option value="teen">13 to 17</option>
            <option value="adult">18 or older</option>
          </select>
        </label>
        {ageBand === "under13" ? (
          <label className="field">
            <span>Parent or guardian email</span>
            <input name="parentEmail" type="email" autoComplete="email" required />
          </label>
        ) : (
          <label className="field">
            <span>Email for a reply</span>
            <input name="email" type="email" autoComplete="email" required />
          </label>
        )}
        <label className="field">
          <span>This question is about</span>
          <select name="careerId" defaultValue="general">
            <option value="general">Health careers in general</option>
            {careers.map((career) => (
              <option key={career.id} value={career.id}>
                {career.name}
              </option>
            ))}
          </select>
        </label>
        <label className="field">
          <span>Your question</span>
          <textarea name="question" rows={4} maxLength={1000} required />
        </label>
        <div className="checkbox">
          <input id="q-consent" name="consent" type="checkbox" required />
          <label htmlFor="q-consent">
            I understand this message is stored so Rayan can reply, and that this is not medical advice.
          </label>
        </div>
        <button className="primary" type="submit" disabled={status.type === "loading"}>
          {status.type === "loading" ? "Saving…" : "Send question"}
        </button>
      </form>
      {status.type === "error" ? <p className="status error">{status.message}</p> : null}
      {status.type === "ok" ? <p className="status ok">{status.message}</p> : null}
    </section>
  );
}

function SubscribeForm() {
  const [status, setStatus] = useState<FormStatus>({ type: "idle" });

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status.type === "loading") {
      return;
    }
    const form = event.currentTarget;
    const data = new FormData(form);
    setStatus({ type: "loading" });
    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: String(data.get("email") ?? ""),
          role: String(data.get("role") ?? ""),
          ageConfirmed: data.get("ageConfirmed") === "on",
          consent: data.get("consent") === "on",
        }),
      });
      const payload = (await response.json()) as { ok?: boolean; error?: string; message?: string };
      if (!response.ok || !payload.ok) {
        throw new Error(payload.error ?? "The signup could not be saved.");
      }
      form.reset();
      setStatus({ type: "ok", message: payload.message ?? "You are on the list." });
    } catch (error) {
      setStatus({
        type: "error",
        message: error instanceof Error ? error.message : "The signup could not be saved.",
      });
    }
  }

  return (
    <section className="panel" aria-labelledby="mail-title">
      <h2 id="mail-title">Stay in the loop</h2>
      <p className="muted">
        Parents, teachers, and students 13 or older can leave an email for future opportunities. This
        site does not email you automatically yet. Your address is stored for the author to use later.
      </p>
      <form onSubmit={onSubmit} noValidate>
        <label className="field">
          <span>Email</span>
          <input name="email" type="email" autoComplete="email" required />
        </label>
        <label className="field">
          <span>I am a</span>
          <select name="role" defaultValue="parent">
            <option value="parent">Parent or guardian</option>
            <option value="teacher">Teacher or counselor</option>
            <option value="student">Student, 13 or older</option>
          </select>
        </label>
        <div className="checkbox">
          <input id="age-confirm" name="ageConfirmed" type="checkbox" required />
          <label htmlFor="age-confirm">I am 13 or older, or I am a parent or teacher signing up.</label>
        </div>
        <div className="checkbox">
          <input id="mail-consent" name="consent" type="checkbox" required />
          <label htmlFor="mail-consent">
            I agree to the <a href="/privacy">privacy notice</a>. Do not sign up a child under 13.
          </label>
        </div>
        <button className="primary" type="submit" disabled={status.type === "loading"}>
          {status.type === "loading" ? "Saving…" : "Join the list"}
        </button>
      </form>
      {status.type === "error" ? <p className="status error">{status.message}</p> : null}
      {status.type === "ok" ? <p className="status ok">{status.message}</p> : null}
    </section>
  );
}

function OlderStudentLinks() {
  return (
    <section className="panel wide" aria-labelledby="older-title">
      <h2 id="older-title">For older students</h2>
      <p className="muted">
        These are outside websites. They are optional. This project does not write MCAT questions.
      </p>
      <p>
        <a className="button-link" href="https://students-residents.aamc.org/prepare-mcat-exam/mcat-sample-question-guide" rel="noopener noreferrer">
          AAMC MCAT sample questions
        </a>{" "}
        <a className="button-link" href="https://www.pcom.edu/about/departments/community-partnerships/outreach.html" rel="noopener noreferrer">
          PCOM youth outreach programs
        </a>{" "}
        <a className="button-link" href="https://hosa.org/" rel="noopener noreferrer">
          HOSA future health professionals
        </a>
      </p>
    </section>
  );
}
