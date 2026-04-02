const FOOTER_LINKS = [
  {
    label: "GitHub",
    href: "https://github.com/sahanpasindu-123",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/sahan-pasindu/",
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
        className="glass-panel relative overflow-hidden rounded-[2rem] px-6 py-6 sm:px-8"
      >
        <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-[#4CE7FF]/70 to-transparent" />
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="space-y-2">
            <p className="text-sm font-medium uppercase tracking-[0.28em] text-slate-400">
              Sahan Pasindu
            </p>
            <p className="max-w-2xl text-sm leading-7 text-slate-300">
              UI/UX-focused full-stack portfolio crafted with React, Tailwind,
              and GSAP-ready motion design.
            </p>
          </div>

          <div className="flex flex-wrap gap-3 text-sm text-slate-300">
            {FOOTER_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel={
                  link.href.startsWith("http") ? "noreferrer" : undefined
                }
                className="rounded-full border border-white/10 bg-slate-950/50 px-4 py-2 transition hover:border-[#4CE7FF]/30 hover:text-white"
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
