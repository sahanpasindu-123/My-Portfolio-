import SkillIcon from "./SkillIcon";
import TechBadge from "./TechBadge";

export default function SkillCategoryCard({
  title,
  description,
  icon,
  skills,
}) {
  return (
    <article
      data-skill-card
      className="group relative overflow-hidden rounded-[2rem] border border-white/12 bg-[#0A1321]/84 p-6 shadow-[0_24px_70px_rgba(2,6,23,0.38)] transition duration-500 hover:-translate-y-1 hover:border-[#9A6EF5]/25 hover:shadow-[0_32px_90px_rgba(154,110,245,0.1)]"
    >
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#4CE7FF]/70 to-transparent opacity-80" />
      <div className="absolute -right-10 top-0 h-28 w-28 rounded-full bg-[#9A6EF5]/10 blur-3xl transition duration-500 group-hover:bg-[#4CE7FF]/10" />

      <div className="flex items-start gap-4">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-[1.25rem] bg-[linear-gradient(135deg,rgba(154,110,245,0.22),rgba(76,231,255,0.14))] text-white ring-1 ring-white/10 shadow-[0_0_26px_rgba(154,110,245,0.12)]">
          <SkillIcon icon={icon} className="h-6 w-6" />
        </div>

        <div className="space-y-2">
          <h3 className="text-xl font-semibold text-white">{title}</h3>
          <p className="text-sm leading-7 text-slate-200">{description}</p>
        </div>
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        {skills.map((skill) => (
          <TechBadge key={skill.name} label={skill.name} icon={skill.icon} />
        ))}
      </div>
    </article>
  );
}
