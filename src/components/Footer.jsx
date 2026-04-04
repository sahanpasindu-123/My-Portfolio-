const FOOTER_LINKS = [
  {
    label: "GitHub",
    href: "https://github.com/sahanpasindu-123",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/sahan-pasindu-483623320",
  },
  {
    label: "Email",
    href: "mailto:lspasindum1720@gmail.com",
  },
];

export default function Footer() {
  return (
    <footer className="mx-auto w-full max-w-6xl px-4 pb-10 pt-4 sm:px-6 lg:px-8">
      <div
        data-reveal
        className="glass-panel relative overflow-hidden rounded-[1.9rem] px-4 py-6 sm:px-6 lg:px-8"
      >
        <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-[#4CE7FF]/70 to-transparent" />
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="min-w-0 space-y-2">
            <p className="type-label text-slate-300">
              Sahan Pasindu
            </p>
            <p className="max-w-2xl text-sm leading-6 text-slate-200 sm:text-[0.98rem]">
              UI/UX-focused full-stack portfolio crafted with React, Tailwind,
              and GSAP-ready motion design.
            </p>
          </div>

          <div className="flex flex-wrap gap-3 text-sm text-slate-200">
            {FOOTER_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel={
                  link.href.startsWith("http") ? "noreferrer" : undefined
                }
                className="rounded-full border border-white/12 bg-slate-950/68 px-4 py-2 transition hover:border-[#4CE7FF]/30 hover:text-white"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
