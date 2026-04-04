import SkillIcon from "./SkillIcon";

export default function ExperienceTimelineCard({
  role,
  company,
  period,
  summary,
  points,
  isFirst = false,
  isLast = false,
}) {
  return (
    <div
      data-experience-card
      className="group relative pl-7 sm:pl-9"
    >
      <div
        className={`absolute left-[0.62rem] w-px bg-gradient-to-b from-[#9A6EF5] via-[#4CE7FF] to-transparent opacity-60 sm:left-[0.72rem] ${
          isFirst ? "top-10" : "top-0"
        } ${isLast ? "bottom-10" : "bottom-0"}`}
      />
      <div className="absolute left-0 top-10 flex h-6 w-6 items-center justify-center rounded-full border border-white/15 bg-[#0B1320] shadow-[0_0_22px_rgba(154,110,245,0.22)] sm:h-7 sm:w-7">
        <div className="h-2.5 w-2.5 rounded-full bg-gradient-to-r from-[#9A6EF5] to-[#4CE7FF]" />
      </div>

      <article className="glass-panel relative overflow-hidden rounded-[1.7rem] p-4 shadow-[0_24px_80px_rgba(2,6,23,0.45)] transition duration-500 hover:-translate-y-1 hover:shadow-[0_32px_100px_rgba(76,231,255,0.08)] sm:p-5 lg:p-6">
        <div className="absolute -right-10 top-0 h-28 w-28 rounded-full bg-[#4CE7FF]/8 blur-3xl" />

        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div className="min-w-0 space-y-3">
            <div className="flex min-w-0 items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-[1rem] bg-[linear-gradient(135deg,rgba(154,110,245,0.22),rgba(76,231,255,0.14))] text-white ring-1 ring-white/10">
                <SkillIcon icon="briefcase" />
              </div>

              <div className="min-w-0">
                <p className="type-meta text-slate-300">
                  Experience
                </p>
                <h3 className="type-card-title text-white">
                  {role}
                </h3>
              </div>
            </div>

            <p className="text-base font-medium text-slate-100 sm:text-lg">
              {company}
            </p>
            <p className="type-card-body max-w-3xl">
              {summary}
            </p>
          </div>

          <div className="type-meta self-start whitespace-nowrap rounded-full border border-white/12 bg-slate-950/72 px-4 py-2 text-[#9FEFFF]">
            {period}
          </div>
        </div>

        <div className="mt-6 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {points.map((point) => (
            <div
              key={point}
              className="rounded-[1.25rem] border border-white/12 bg-slate-950/68 px-4 py-4 text-sm leading-6 text-slate-100"
            >
              {point}
            </div>
          ))}
        </div>
      </article>
    </div>
  );
}
