import AnimatedSection from "../components/AnimatedSection";
import heroGrid from "../assets/hero-grid.svg";

const focusAreas = [
  "Frontend development",
  "Modern web technologies",
  "Scalable applications",
];

const stackItems = [
  {
    title: "Frontend implementation",
    description:
      "Building responsive interfaces with modern React patterns, clean structure, and practical frontend foundations.",
  },
  {
    title: "Usable interfaces",
    description:
      "Applying UI/UX thinking to keep interfaces clean, user-friendly, and consistent across the frontend.",
  },
  {
    title: "Software foundations",
    description:
      "Strengthening problem-solving and software engineering skills through continuous learning and real-world projects.",
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
      className="content-panel relative isolate overflow-hidden rounded-[2.5rem] border border-white/12 bg-[#09101A]/90 px-6 py-16 shadow-[0_40px_120px_rgba(2,6,23,0.6)] sm:px-10 sm:py-20"
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

      <div className="relative z-10 grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
        <div
          data-parallax
          data-speed="medium"
          data-parallax-x="right"
          data-mouse-parallax
          className="space-y-8"
        >
          <div className="space-y-5">
            <p
              data-hero-item
              className="inline-flex rounded-full border border-white/12 bg-white/[0.08] px-4 py-2 text-xs font-medium uppercase tracking-[0.32em] text-[#9FEFFF]"
            >
              Portfolio / 2026
            </p>
            <div data-hero-item className="space-y-4">
              <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
                Sahan Pasindu
              </h1>
              <h2 className="max-w-3xl text-lg font-medium leading-relaxed text-slate-100 sm:text-xl lg:text-2xl">
                Undergraduate IT Student | Future Frontend Developer &amp;
                Software Engineer
              </h2>
            </div>
            <p
              data-hero-item
              className="max-w-2xl text-[1.03rem] leading-8 text-slate-200 sm:text-lg"
            >
              I am an IT undergraduate with a growing interest in frontend
              development and modern web technologies. I enjoy building clean,
              user-friendly interfaces and continuously improving my skills to
              create better digital experiences.
            </p>
          </div>

          <div data-hero-item className="flex flex-wrap gap-4">
            <a
              href="/cv.pdf"
              download
              data-button-hover
              className="rounded-full bg-gradient-to-r from-[#9A6EF5] to-[#4CE7FF] px-6 py-3 font-medium text-slate-950 shadow-[0_16px_40px_rgba(76,231,255,0.18)] transition hover:scale-[1.02]"
            >
              Download CV
            </a>
            <a
              href="#projects"
              data-button-hover
              className="glass-panel rounded-full px-6 py-3 font-medium text-white transition hover:bg-white/[0.12]"
            >
              View Projects
            </a>
          </div>

          <div data-hero-item className="flex flex-wrap gap-3">
            {focusAreas.map((item) => (
              <span
                key={item}
                className="rounded-full border border-white/12 bg-slate-950/72 px-4 py-2 text-sm text-slate-100"
              >
                {item}
              </span>
            ))}
          </div>
        </div>

        <div
          data-parallax
          data-speed="medium"
          data-parallax-x="left"
          data-mouse-parallax
        >
          <div
            data-hero-card
            className="glass-panel relative overflow-hidden rounded-[2rem] p-6 shadow-[0_28px_100px_rgba(2,6,23,0.48)]"
          >
            <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-[#4CE7FF]/70 to-transparent" />
            <p className="text-sm font-medium uppercase tracking-[0.3em] text-slate-300">
              Development Focus
            </p>

            <div className="mt-6 grid gap-4">
              {stackItems.map((item) => (
                <div
                  key={item.title}
                  className="rounded-[1.5rem] border border-white/12 bg-slate-950/70 p-5"
                >
                  <p className="text-sm uppercase tracking-[0.24em] text-[#9FEFFF]">
                    {item.title}
                  </p>
                  <p className="mt-3 leading-7 text-slate-200">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}
