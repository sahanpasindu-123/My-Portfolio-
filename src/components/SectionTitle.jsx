export default function SectionTitle({ eyebrow, title, description }) {
  return (
    <div data-section-title className="max-w-2xl space-y-4">
      <p data-section-title-item className="pill">
        {eyebrow}
      </p>
      <h2
        data-section-title-item
        className="text-3xl font-semibold tracking-tight text-white sm:text-4xl"
      >
        {title}
      </h2>
      <p
        data-section-title-item
        className="text-base leading-7 text-slate-300 sm:text-lg"
      >
        {description}
      </p>
    </div>
  );
}
