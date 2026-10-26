"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { CareerIcon } from "@/components/CareerIcon";
import { careers } from "@/lib/careers";

export function SiteHeader() {
  const [query, setQuery] = useState("");
  const normalized = query.trim().toLowerCase();
  const matches = useMemo(
    () =>
      careers.filter((career) =>
        `${career.name} ${career.shortName} ${career.navLabel}`.toLowerCase().includes(normalized),
      ),
    [normalized],
  );

  return (
    <header className="site-header">
      <div className="header-inner">
        <div className="brand-row">
          <Link className="brand" href="/">
            <LogoMark />
            <span className="brand-text">
              <strong>Health Careers Explorer</strong>
              <span>Pick a job. See the path. Try something now.</span>
            </span>
          </Link>
          <p className="pcom-chip">Youth outreach project · PCOM Georgia</p>
        </div>
        <div className="search-row">
          <label htmlFor="career-search">Find a career</label>
          <input
            id="career-search"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Nurse, pharmacist, researcher…"
            autoComplete="off"
          />
          <label htmlFor="jump-select" className="sr-only">
            Jump to a career
          </label>
          <select
            id="jump-select"
            value=""
            onChange={(event) => {
              const id = event.target.value;
              if (id) {
                document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
                event.currentTarget.value = "";
              }
            }}
          >
            <option value="">Jump to a module</option>
            {careers.map((career) => (
              <option key={career.id} value={career.id}>
                {career.name}
              </option>
            ))}
          </select>
        </div>
        <nav className="career-nav" aria-label="Career modules">
          {careers.map((career) => {
            const hidden = Boolean(normalized) && !matches.some((item) => item.id === career.id);
            return (
              <a key={career.id} href={`/#${career.id}`} hidden={hidden}>
                <CareerIcon id={career.id} title={career.name} />
                {career.navLabel}
              </a>
            );
          })}
        </nav>
        {normalized && matches.length === 0 ? (
          <p className="search-empty" role="status">
            No career on this page matches “{query}”. Try physician, PA, nurse, PT, pharmacist,
            educator, or researcher.
          </p>
        ) : null}
      </div>
    </header>
  );
}

function LogoMark() {
  return (
    <svg className="logo-mark" viewBox="0 0 64 64" role="img" aria-label="Health Careers Explorer">
      <rect x="4" y="8" width="56" height="48" rx="16" fill="#ffdf5a" stroke="#16324f" strokeWidth="4" />
      <circle cx="32" cy="28" r="8" fill="#f7c7a8" stroke="#16324f" strokeWidth="3" />
      <path d="M16 50c4-12 28-12 32 0" fill="#1c8fd0" stroke="#16324f" strokeWidth="3" />
      <rect x="29" y="36" width="6" height="14" fill="#fff" stroke="#16324f" strokeWidth="2" />
      <rect x="24" y="41" width="16" height="6" fill="#fff" stroke="#16324f" strokeWidth="2" />
    </svg>
  );
}
