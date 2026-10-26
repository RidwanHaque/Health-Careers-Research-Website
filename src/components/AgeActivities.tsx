"use client";

import { useState } from "react";
import { AGE_BANDS, ageBandLabels, type AgeBand } from "@/lib/careers";

export function AgeActivities({ items }: { items: Record<AgeBand, string[]> }) {
  const [band, setBand] = useState<AgeBand>("elementary");

  return (
    <div className="try-now">
      <h3>Things you can do now</h3>
      <p className="muted">Pick your age group. These are starting ideas, not requirements.</p>
      <div className="age-tabs" role="tablist" aria-label="Age group">
        {AGE_BANDS.map((id) => (
          <button
            key={id}
            type="button"
            role="tab"
            aria-selected={band === id}
            onClick={() => setBand(id)}
          >
            {ageBandLabels[id]}
          </button>
        ))}
      </div>
      <ul role="tabpanel">
        {items[band].map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}
