export default function SectionTitle({
  eyebrow,
  title,
  description,
  className = "",
}) {
  return (
    <div data-reveal className={`max-w-2xl space-y-4 ${className}`.trim()}>
      <p className="pill">{eyebrow}</p>
      <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
        {title}
      </h2>
      <p className="text-base leading-7 text-slate-300 sm:text-lg">
        {description}
      </p>
    </div>
  );
}
