import type { CareerId } from "@/lib/careers";

type Props = { id: CareerId; title?: string };

export function CareerIcon({ id, title }: Props) {
  const label = title ?? id;
  const common = {
    viewBox: "0 0 64 64",
    role: "img",
    "aria-label": label,
  } as const;

  if (id === "physician") {
    return (
      <svg {...common}>
        <rect x="8" y="10" width="48" height="44" rx="12" fill="#fff" stroke="#16324f" strokeWidth="3" />
        <circle cx="32" cy="26" r="8" fill="#f7c7a8" stroke="#16324f" strokeWidth="2.5" />
        <path d="M18 48c2-10 26-10 28 0" fill="#e85d4c" stroke="#16324f" strokeWidth="2.5" />
        <rect x="29" y="34" width="6" height="16" rx="2" fill="#fff" stroke="#16324f" strokeWidth="2" />
        <rect x="24" y="39" width="16" height="6" rx="2" fill="#fff" stroke="#16324f" strokeWidth="2" />
      </svg>
    );
  }
  if (id === "physician-assistant") {
    return (
      <svg {...common}>
        <rect x="6" y="12" width="52" height="40" rx="10" fill="#fff" stroke="#16324f" strokeWidth="3" />
        <path d="M16 40V24h8l4 8 4-8h8v16" fill="none" stroke="#16324f" strokeWidth="3" />
        <circle cx="48" cy="22" r="6" fill="#f4a127" stroke="#16324f" strokeWidth="2.5" />
      </svg>
    );
  }
  if (id === "nurse") {
    return (
      <svg {...common}>
        <circle cx="32" cy="32" r="22" fill="#fff" stroke="#16324f" strokeWidth="3" />
        <path d="M20 34c0-8 24-8 24 0v6H20z" fill="#3dbb6b" stroke="#16324f" strokeWidth="2.5" />
        <rect x="29" y="18" width="6" height="16" fill="#fff" stroke="#16324f" strokeWidth="2" />
        <rect x="24" y="23" width="16" height="6" fill="#fff" stroke="#16324f" strokeWidth="2" />
      </svg>
    );
  }
  if (id === "physical-therapist") {
    return (
      <svg {...common}>
        <rect x="10" y="14" width="44" height="36" rx="12" fill="#fff" stroke="#16324f" strokeWidth="3" />
        <circle cx="24" cy="40" r="6" fill="#5b8def" stroke="#16324f" strokeWidth="2.5" />
        <circle cx="44" cy="40" r="6" fill="#5b8def" stroke="#16324f" strokeWidth="2.5" />
        <path d="M24 28h16l-2-10H26z" fill="#ffdf5a" stroke="#16324f" strokeWidth="2.5" />
      </svg>
    );
  }
  if (id === "pharmacist") {
    return (
      <svg {...common}>
        <rect x="18" y="8" width="28" height="48" rx="10" fill="#fff" stroke="#16324f" strokeWidth="3" />
        <path d="M24 28h16v18a8 8 0 0 1-16 0z" fill="#9b59b6" />
        <rect x="26" y="14" width="12" height="8" rx="2" fill="#ffdf5a" stroke="#16324f" strokeWidth="2" />
      </svg>
    );
  }
  if (id === "educator") {
    return (
      <svg {...common}>
        <rect x="8" y="18" width="48" height="30" rx="6" fill="#fff" stroke="#16324f" strokeWidth="3" />
        <path d="M8 20l24-10 24 10" fill="#ef6c9c" stroke="#16324f" strokeWidth="3" />
        <path d="M40 24v22" stroke="#16324f" strokeWidth="3" />
      </svg>
    );
  }
  return (
    <svg {...common}>
      <circle cx="32" cy="32" r="22" fill="#fff" stroke="#16324f" strokeWidth="3" />
      <circle cx="32" cy="32" r="8" fill="#2bb7c7" stroke="#16324f" strokeWidth="2.5" />
      <path d="M32 10v8M32 46v8M10 32h8M46 32h8" stroke="#16324f" strokeWidth="3" />
    </svg>
  );
}
