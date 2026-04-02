import SkillIcon from "./SkillIcon";

export default function TechBadge({ label, icon }) {
  return (
    <div
      data-skill-badge
      className="group/item flex items-center gap-3 rounded-[1.25rem] border border-white/12 bg-slate-950/72 px-4 py-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] transition duration-300 hover:-translate-y-1 hover:border-[#4CE7FF]/30 hover:shadow-[0_18px_50px_rgba(76,231,255,0.08)]"
    >
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[1rem] bg-[linear-gradient(135deg,rgba(154,110,245,0.22),rgba(76,231,255,0.14))] text-[#9FEFFF] ring-1 ring-white/10 transition duration-300 group-hover/item:text-white">
        <SkillIcon icon={icon} />
      </div>
      <span className="text-sm font-medium text-slate-100">{label}</span>
    </div>
  );
}
