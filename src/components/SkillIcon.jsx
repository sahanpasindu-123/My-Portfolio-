const ICONS = {
  design: (
    <>
      <circle cx="9" cy="7" r="2.5" />
      <circle cx="15.5" cy="7" r="2.5" />
      <circle cx="9" cy="15.5" r="2.5" />
      <path d="M15.5 10.5v7.5" />
      <path d="M13 15.5h5" />
    </>
  ),
  markup: (
    <>
      <path d="m8 7-4 5 4 5" />
      <path d="m16 7 4 5-4 5" />
      <path d="m13.5 5-3 14" />
    </>
  ),
  style: (
    <>
      <path d="M7 6h10" />
      <path d="M5 11h14" />
      <path d="M7 16h10" />
      <path d="M9 20h6" />
    </>
  ),
  code: (
    <>
      <path d="m8 8-4 4 4 4" />
      <path d="m16 8 4 4-4 4" />
      <path d="m13.5 4-3 16" />
    </>
  ),
  react: (
    <>
      <circle cx="12" cy="12" r="2" fill="currentColor" stroke="none" />
      <ellipse cx="12" cy="12" rx="8" ry="3.5" />
      <ellipse cx="12" cy="12" rx="8" ry="3.5" transform="rotate(60 12 12)" />
      <ellipse cx="12" cy="12" rx="8" ry="3.5" transform="rotate(120 12 12)" />
    </>
  ),
  server: (
    <>
      <rect x="4" y="5" width="16" height="5" rx="1.5" />
      <rect x="4" y="14" width="16" height="5" rx="1.5" />
      <path d="M8 7.5h.01" />
      <path d="M8 16.5h.01" />
      <path d="M12 7.5h4" />
      <path d="M12 16.5h4" />
    </>
  ),
  api: (
    <>
      <path d="M4 8h7" />
      <path d="m8 4 4 4-4 4" />
      <path d="M20 16h-7" />
      <path d="m16 12-4 4 4 4" />
    </>
  ),
  auth: (
    <>
      <rect x="6" y="11" width="12" height="9" rx="2" />
      <path d="M9 11V8.5a3 3 0 1 1 6 0V11" />
      <path d="M12 15.5v1.5" />
    </>
  ),
  database: (
    <>
      <ellipse cx="12" cy="6.5" rx="6.5" ry="2.5" />
      <path d="M5.5 6.5v5c0 1.4 2.9 2.5 6.5 2.5s6.5-1.1 6.5-2.5v-5" />
      <path d="M5.5 11.5v6c0 1.4 2.9 2.5 6.5 2.5s6.5-1.1 6.5-2.5v-6" />
    </>
  ),
  git: (
    <>
      <circle cx="7" cy="6" r="2" />
      <circle cx="7" cy="18" r="2" />
      <circle cx="17" cy="12" r="2" />
      <path d="M7 8v8" />
      <path d="M9 6h5a3 3 0 0 1 3 3v1" />
      <path d="M9 18h3a5 5 0 0 0 5-5" />
    </>
  ),
  tool: (
    <>
      <path d="m14 6 4 4" />
      <path d="m12.5 7.5 4 4" />
      <path d="m10 14-5.5 5.5" />
      <path d="M9 6a3 3 0 0 0 4 4l-4 4a3.5 3.5 0 1 1-5-5l4-4Z" />
    </>
  ),
  docker: (
    <>
      <rect x="5" y="9" width="3" height="3" rx="0.6" />
      <rect x="9" y="9" width="3" height="3" rx="0.6" />
      <rect x="13" y="9" width="3" height="3" rx="0.6" />
      <rect x="9" y="5" width="3" height="3" rx="0.6" />
      <path d="M4 14h12a4 4 0 0 0 4-4" />
      <path d="M15 6.5h3" />
    </>
  ),
  briefcase: (
    <>
      <rect x="4" y="7" width="16" height="11" rx="2" />
      <path d="M9 7V5.5A1.5 1.5 0 0 1 10.5 4h3A1.5 1.5 0 0 1 15 5.5V7" />
      <path d="M4 12h16" />
    </>
  ),
};

export default function SkillIcon({ icon, className = "h-5 w-5" }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {ICONS[icon] ?? ICONS.code}
    </svg>
  );
}
