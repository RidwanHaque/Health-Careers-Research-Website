"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export function AdminLoginForm({ configured }: { configured: boolean }) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (loading) {
      return;
    }
    const password = String(new FormData(event.currentTarget).get("password") ?? "");
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = (await response.json()) as { ok?: boolean; error?: string };
      if (!response.ok || !data.ok) {
        throw new Error(data.error ?? "Sign-in failed.");
      }
      router.push("/admin");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Sign-in failed.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main id="main" className="wrap">
      <article className="admin-shell">
        <h1>Staff login</h1>
        <p className="muted">This page is for the site author and mentors. It is not part of the student lesson.</p>
        {configured ? (
          <form onSubmit={onSubmit}>
            <label className="field">
              <span>Password</span>
              <input name="password" type="password" autoComplete="current-password" required />
            </label>
            <button className="primary" type="submit" disabled={loading}>
              {loading ? "Checking…" : "Sign in"}
            </button>
          </form>
        ) : (
          <p className="status info">Admin login is turned off until ADMIN_PASSWORD is set on the server.</p>
        )}
        {error ? <p className="status error">{error}</p> : null}
      </article>
    </main>
  );
}
