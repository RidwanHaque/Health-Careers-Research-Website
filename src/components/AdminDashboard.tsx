"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import type { PollCounts, StoredQuestion, StoredSubscriber } from "@/lib/store";

type Props = {
  poll: PollCounts;
  questions: StoredQuestion[];
  subscribers: StoredSubscriber[];
};

export function AdminDashboard({ poll, questions, subscribers }: Props) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  async function logout() {
    setError(null);
    const response = await fetch("/api/admin/logout", { method: "POST" });
    if (!response.ok) {
      setError("Sign-out failed. Refresh and try again.");
      return;
    }
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <main id="main" className="wrap">
      <article className="admin-shell">
        <h1>Submissions</h1>
        <p className="muted">Emails and questions are private. Do not screenshot this page into public slides.</p>
        <button className="secondary" type="button" onClick={logout}>
          Sign out
        </button>
        {error ? <p className="status error">{error}</p> : null}

        <h2>Poll</h2>
        <ul>
          {Object.entries(poll).map(([id, count]) => (
            <li key={id}>
              {id}: {count}
            </li>
          ))}
        </ul>

        <h2>Questions ({questions.length})</h2>
        {questions.length === 0 ? (
          <p className="status info">No questions yet.</p>
        ) : (
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>When</th>
                  <th>From</th>
                  <th>Reply to</th>
                  <th>Topic</th>
                  <th>Question</th>
                </tr>
              </thead>
              <tbody>
                {questions.map((item) => (
                  <tr key={item.id}>
                    <td>{item.createdAt}</td>
                    <td>
                      {item.displayName} ({item.ageBand})
                    </td>
                    <td>{item.replyEmail}</td>
                    <td>{item.careerId}</td>
                    <td>{item.question}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <h2>Opportunity list ({subscribers.length})</h2>
        {subscribers.length === 0 ? (
          <p className="status info">No signups yet.</p>
        ) : (
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>When</th>
                  <th>Role</th>
                  <th>Email</th>
                </tr>
              </thead>
              <tbody>
                {subscribers.map((item) => (
                  <tr key={item.id}>
                    <td>{item.createdAt}</td>
                    <td>{item.role}</td>
                    <td>{item.email}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </article>
    </main>
  );
}
