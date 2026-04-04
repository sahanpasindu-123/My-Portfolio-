import SkillIcon from "./SkillIcon";

export default function TechBadge({ label, icon }) {
  return (
    <div
      data-skill-badge
      className="group/item flex items-center gap-3 rounded-[1.2rem] border border-white/12 bg-slate-950/72 px-3.5 py-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] transition duration-300 hover:-translate-y-1 hover:border-[#4CE7FF]/30 hover:shadow-[0_18px_50px_rgba(76,231,255,0.08)]"
    >
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[0.95rem] bg-[linear-gradient(135deg,rgba(154,110,245,0.22),rgba(76,231,255,0.14))] text-[#9FEFFF] ring-1 ring-white/10 transition duration-300 group-hover/item:text-white sm:h-11 sm:w-11">
        <SkillIcon icon={icon} />
      </div>
      <span className="text-sm font-medium leading-5 text-slate-100 sm:text-[0.98rem]">
        {label}
      </span>
    </div>
  );
}
