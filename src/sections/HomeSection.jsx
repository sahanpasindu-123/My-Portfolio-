import AnimatedSection from "../components/AnimatedSection";
import heroGrid from "../assets/hero-grid.svg";

const focusHighlights = [
  {
    title: "Frontend implementation",
    description:
      "Building responsive React interfaces with clean structure and practical UI detail.",
  },
  {
    title: "UI clarity",
    description:
      "Keeping layouts readable, intentional, and consistent across devices and screen sizes.",
  },
  {
    title: "Software foundations",
    description:
      "Growing through real projects that strengthen problem solving and engineering fundamentals.",
  },
];

export default function HomeSection({ isActive = false }) {
  return (
    <AnimatedSection
      id="home"
      animation="home"
      isActive={isActive}
      data-section
      data-parallax-scope
      data-hero-section
      className="content-panel relative isolate overflow-hidden rounded-[2rem] border border-white/12 bg-[#09101A]/90 px-4 py-9 shadow-[0_40px_120px_rgba(2,6,23,0.6)] sm:rounded-[2.3rem] sm:px-6 sm:py-12 md:px-8 md:py-14 lg:px-10 lg:py-16"
    >
      <div
        data-parallax
        data-speed="slow"
        className="parallax-atmosphere absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(154,110,245,0.16),transparent_28%),radial-gradient(circle_at_85%_18%,rgba(76,231,255,0.12),transparent_20%),linear-gradient(135deg,rgba(9,14,24,0.98),rgba(9,14,24,0.92),rgba(8,16,29,0.98))]"
      />
      <div
        data-parallax
        data-speed="slow"
        data-parallax-x="right"
        className="parallax-atmosphere absolute inset-[-20%] bg-[conic-gradient(from_90deg_at_50%_50%,rgba(154,110,245,0.14),rgba(76,231,255,0.08),rgba(154,110,245,0.12))] opacity-40 blur-3xl animate-aurora"
      />
      <div
        data-parallax
        data-speed="slow"
        data-parallax-x="left"
        className="parallax-atmosphere absolute -left-16 top-16 h-44 w-44 rounded-full bg-[#9A6EF5]/18 blur-3xl animate-float-slow"
      />
      <div
        data-parallax
        data-speed="slow"
        data-parallax-x="right"
        className="parallax-atmosphere absolute right-0 top-12 h-56 w-56 rounded-full bg-[#4CE7FF]/14 blur-3xl animate-float-reverse"
      />
      <div
        data-parallax
        data-speed="slow"
        data-parallax-x="left"
        className="parallax-atmosphere absolute bottom-10 right-1/4 h-32 w-32 rounded-full bg-[#9A6EF5]/8 blur-3xl animate-float-slow"
      />
      <img
        src={heroGrid}
        alt=""
        data-parallax
        data-speed="slow"
        data-parallax-x="right"
        className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-12 mix-blend-screen"
      />
      <div className="parallax-fog pointer-events-none absolute inset-x-0 bottom-0 h-36" />
      <div className="section-noise-guard" aria-hidden="true" />

      <div className="relative z-10 grid gap-6 sm:gap-8 lg:grid-cols-[minmax(0,1.08fr)_minmax(320px,0.92fr)] lg:items-center lg:gap-10">
        <div
          data-parallax
          data-speed="medium"
          data-parallax-x="right"
          data-mouse-parallax
          className="min-w-0 space-y-5 sm:space-y-6"
        >
          <div className="space-y-4">
            <p
              data-hero-item
              className="pill type-label border-white/12 bg-white/[0.08] px-3 py-2 sm:px-4"
            >
              Portfolio / 2026
            </p>
            <div data-hero-item className="min-w-0 space-y-3">
              <h1 className="type-hero-title text-white">
                Sahan Pasindu
              </h1>
              <h2 className="max-w-2xl text-[clamp(1.05rem,0.98rem+0.45vw,1.34rem)] font-medium leading-[1.5] text-slate-100 [text-wrap:balance]">
                Frontend-focused IT undergraduate building clear, scalable web
                interfaces.
              </h2>
            </div>
            <p
              data-hero-item
              className="type-body max-w-xl"
            >
              I build clean, user-friendly interfaces through practical
              projects, modern frontend tools, and a steady focus on better
              digital experiences.
            </p>
          </div>

          <div
            data-hero-item
            className="flex flex-col gap-3 sm:flex-row sm:flex-wrap"
          >
            <a
              href="/public/Sahan-Pasindu-cv.pdf"
              download
              data-button-hover
              className="inline-flex w-full items-center justify-center rounded-full bg-gradient-to-r from-[#9A6EF5] to-[#4CE7FF] px-6 py-3 font-medium text-slate-950 shadow-[0_16px_40px_rgba(76,231,255,0.18)] transition hover:scale-[1.02] sm:w-auto"
            >
              Download CV
            </a>
            <a
              href="#projects"
              data-button-hover
              className="glass-panel inline-flex w-full items-center justify-center rounded-full px-6 py-3 font-medium text-white transition hover:bg-white/[0.12] sm:w-auto"
            >
              View Projects
            </a>
          </div>
        </div>

        <div
          data-parallax
          data-speed="medium"
          data-parallax-x="left"
          data-mouse-parallax
          className="min-w-0"
        >
          <div
            data-hero-card
            className="glass-panel relative max-w-xl overflow-hidden rounded-[1.7rem] p-4 shadow-[0_28px_100px_rgba(2,6,23,0.48)] sm:p-5 md:p-6 lg:ml-auto"
          >
            <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-[#4CE7FF]/70 to-transparent" />
            <p className="type-label text-slate-300">
              Current Focus
            </p>
            <p className="mt-4 max-w-md text-sm leading-6 text-slate-200 sm:text-[0.98rem]">
              A compact snapshot of the areas shaping the work right now.
            </p>

            <div className="mt-5 space-y-3">
              {focusHighlights.map((item) => (
                <div
                  key={item.title}
                  className="flex items-start gap-3 rounded-[1.25rem] border border-white/12 bg-slate-950/70 px-4 py-3.5"
                >
                  <span className="mt-2 h-2.5 w-2.5 shrink-0 rounded-full bg-gradient-to-r from-[#9A6EF5] to-[#4CE7FF]" />
                  <div className="space-y-1.5">
                    <p className="type-meta text-[#9FEFFF]">
                      {item.title}
                    </p>
                    <p className="text-sm leading-6 text-slate-200">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}
