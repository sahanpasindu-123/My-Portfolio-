const highlights = [
  {
    id: "01",
    title: "UI/UX Design",
    description:
      "Crafting user flows, wireframes, and polished interfaces with clarity and usability in mind.",
  },
  {
    id: "02",
    title: "React Development",
    description:
      "Building responsive frontend experiences with reusable components and modern styling systems.",
  },
  {
    id: "03",
    title: "Backend Integration",
    description:
      "Connecting frontend products to APIs and data services so the experience feels complete end to end.",
  },
];

export default function AboutSection() {
  return (
    <section
      id="about"
      className="relative isolate overflow-hidden rounded-[2.25rem] border border-white/10 bg-white/[0.03] px-6 py-16 shadow-[0_28px_90px_rgba(2,6,23,0.45)] sm:px-10"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_18%,rgba(154,110,245,0.16),transparent_24%),radial-gradient(circle_at_90%_82%,rgba(76,231,255,0.12),transparent_20%)]" />

      <div className="relative grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
        <div className="space-y-6">
          <p className="inline-flex rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 text-xs font-medium uppercase tracking-[0.3em] text-[#9A6EF5]">
            About Me
          </p>

          <div className="space-y-4">
            <h2 className="max-w-3xl text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              IT undergraduate at the University of Kelaniya with a strong
              focus on UI/UX thinking and modern frontend development.
            </h2>
            <p className="text-base leading-8 text-slate-300 sm:text-lg">
              I am building a portfolio around thoughtful interface design,
              smooth frontend execution, and practical backend integration.
              My goal is to create digital experiences that feel intuitive,
              performant, and ready to scale.
            </p>
          </div>

          <div className="glass-panel rounded-[1.75rem] p-6">
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <p className="text-xs uppercase tracking-[0.28em] text-slate-400">
                  Education
                </p>
                <p className="mt-3 text-lg font-medium text-white">
                  University of Kelaniya
                </p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.28em] text-slate-400">
                  Focus
                </p>
                <p className="mt-3 text-lg font-medium text-white">
                  UI/UX + Frontend
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
          {highlights.map((item) => (
            <article
              key={item.title}
              className="glass-panel rounded-[1.75rem] p-6 transition hover:-translate-y-1"
            >
              <p className="text-sm font-medium uppercase tracking-[0.3em] text-[#4CE7FF]">
                {item.id}
              </p>
              <h3 className="mt-5 text-xl font-semibold text-white">
                {item.title}
              </h3>
              <p className="mt-4 leading-7 text-slate-300">
                {item.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
