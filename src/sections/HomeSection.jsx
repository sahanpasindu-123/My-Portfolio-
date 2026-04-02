import heroGrid from "../assets/hero-grid.svg";

const focusAreas = [
  "Design systems",
  "Interactive frontend",
  "Scalable product UI",
];

const stackItems = [
  {
    title: "UI-first thinking",
    description:
      "Designing interfaces that balance usability, visual polish, and product clarity.",
  },
  {
    title: "Frontend execution",
    description:
      "Turning concepts into responsive React experiences with clean component structure.",
  },
  {
    title: "Full-stack mindset",
    description:
      "Connecting interfaces to practical backend workflows that support real products.",
  },
];

export default function HomeSection() {
  return (
    <section
      id="home"
      className="relative isolate overflow-hidden rounded-[2.5rem] border border-white/10 bg-[#0B0F19]/80 px-6 py-16 shadow-[0_40px_120px_rgba(2,6,23,0.6)] sm:px-10 sm:py-20"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(154,110,245,0.26),transparent_28%),radial-gradient(circle_at_85%_18%,rgba(76,231,255,0.18),transparent_20%),linear-gradient(135deg,rgba(11,15,25,0.96),rgba(11,15,25,0.86),rgba(9,17,31,0.96))]" />
      <div className="absolute inset-[-20%] bg-[conic-gradient(from_90deg_at_50%_50%,rgba(154,110,245,0.26),rgba(76,231,255,0.14),rgba(154,110,245,0.22))] opacity-60 blur-3xl animate-aurora" />
      <div className="absolute -left-16 top-16 h-44 w-44 rounded-full bg-[#9A6EF5]/30 blur-3xl animate-float-slow" />
      <div className="absolute right-0 top-12 h-56 w-56 rounded-full bg-[#4CE7FF]/20 blur-3xl animate-float-reverse" />
      <div className="absolute bottom-10 right-1/4 h-32 w-32 rounded-full bg-[#9A6EF5]/12 blur-3xl animate-float-slow" />
      <img
        src={heroGrid}
        alt=""
        className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-25 mix-blend-screen"
      />

      <div className="relative grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
        <div className="space-y-8">
          <div className="space-y-5">
            <p className="inline-flex rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 text-xs font-medium uppercase tracking-[0.32em] text-[#4CE7FF]">
              Portfolio / 2026
            </p>
            <div className="space-y-4">
              <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
                Sahan Pasindu
              </h1>
              <h2 className="max-w-3xl bg-gradient-to-r from-[#9A6EF5] to-[#4CE7FF] bg-clip-text text-2xl font-medium text-transparent sm:text-3xl lg:text-4xl">
                UI/UX Designer &amp; Full-Stack Developer
              </h2>
            </div>
            <p className="max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
              IT Undergraduate passionate about building intuitive and scalable
              digital experiences
            </p>
          </div>

          <div className="flex flex-wrap gap-4">
            <a
              href="#projects"
              className="rounded-full bg-gradient-to-r from-[#9A6EF5] to-[#4CE7FF] px-6 py-3 font-medium text-slate-950 shadow-[0_16px_40px_rgba(76,231,255,0.18)] transition hover:scale-[1.02]"
            >
              View Projects
            </a>
            <a
              href="#contact"
              className="glass-panel rounded-full px-6 py-3 font-medium text-white transition hover:bg-white/[0.1]"
            >
              Contact Me
            </a>
          </div>

          <div className="flex flex-wrap gap-3">
            {focusAreas.map((item) => (
              <span
                key={item}
                className="rounded-full border border-white/10 bg-slate-950/50 px-4 py-2 text-sm text-slate-200"
              >
                {item}
              </span>
            ))}
          </div>
        </div>

        <div className="glass-panel relative overflow-hidden rounded-[2rem] p-6 shadow-[0_28px_100px_rgba(2,6,23,0.48)]">
          <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-[#4CE7FF]/70 to-transparent" />
          <p className="text-sm font-medium uppercase tracking-[0.3em] text-slate-400">
            Creative Stack
          </p>

          <div className="mt-6 grid gap-4">
            {stackItems.map((item) => (
              <div
                key={item.title}
                className="rounded-[1.5rem] border border-white/10 bg-slate-950/45 p-5"
              >
                <p className="text-sm uppercase tracking-[0.24em] text-[#4CE7FF]">
                  {item.title}
                </p>
                <p className="mt-3 leading-7 text-slate-300">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
