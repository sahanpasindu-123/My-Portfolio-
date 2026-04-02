import SkillIcon from "./SkillIcon";

export default function ExperienceTimelineCard({
  role,
  company,
  period,
  summary,
  points,
}) {
  return (
    <div data-experience-card className="group relative pl-10">
      <div className="absolute left-[0.85rem] top-0 h-full w-px bg-gradient-to-b from-[#9A6EF5] via-[#4CE7FF] to-transparent opacity-60" />
      <div className="absolute left-0 top-8 flex h-7 w-7 items-center justify-center rounded-full border border-white/15 bg-[#0B1320] shadow-[0_0_22px_rgba(154,110,245,0.22)]">
        <div className="h-2.5 w-2.5 rounded-full bg-gradient-to-r from-[#9A6EF5] to-[#4CE7FF]" />
      </div>

      <article className="glass-panel relative overflow-hidden rounded-[2rem] p-6 shadow-[0_24px_80px_rgba(2,6,23,0.45)] transition duration-500 hover:-translate-y-1 hover:shadow-[0_32px_100px_rgba(76,231,255,0.08)]">
        <div className="absolute -right-10 top-0 h-28 w-28 rounded-full bg-[#4CE7FF]/8 blur-3xl" />

        <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-[1rem] bg-[linear-gradient(135deg,rgba(154,110,245,0.22),rgba(76,231,255,0.14))] text-white ring-1 ring-white/10">
                <SkillIcon icon="briefcase" />
              </div>

              <div>
                <p className="text-xs uppercase tracking-[0.28em] text-slate-300">
                  Experience
                </p>
                <h3 className="text-2xl font-semibold text-white">{role}</h3>
              </div>
            </div>

            <p className="text-lg font-medium text-slate-100">{company}</p>
            <p className="max-w-3xl text-[1.01rem] leading-8 text-slate-200">{summary}</p>
          </div>

          <div className="rounded-full border border-white/12 bg-slate-950/72 px-4 py-2 text-sm font-medium uppercase tracking-[0.22em] whitespace-nowrap text-[#9FEFFF]">
            {period}
          </div>
        </div>

        <div className="mt-8 grid gap-3 md:grid-cols-3">
          {points.map((point) => (
            <div
              key={point}
              className="rounded-[1.25rem] border border-white/12 bg-slate-950/68 px-4 py-4 text-sm leading-7 text-slate-100"
            >
              {point}
            </div>
          ))}
        </div>
      </article>
    </div>
  );
}
