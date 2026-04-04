export default function SectionTitle({
  eyebrow,
  title,
  subtitle,
  description,
}) {
  return (
    <div
      data-section-title
      data-parallax
      data-speed="medium"
      className="max-w-[38rem] min-w-0 space-y-4 sm:space-y-5"
    >
      <p
        data-section-title-item
        className="pill type-label bg-white/[0.08] px-3 py-2 sm:px-4"
      >
        {eyebrow}
      </p>
      <div className="space-y-3">
        <h2
          data-section-title-item
          className="type-section-title text-white"
        >
          {title}
        </h2>
        {subtitle ? (
          <p
            data-section-title-item
            className="type-section-subtitle"
          >
            {subtitle}
          </p>
        ) : null}
      </div>
      {description ? (
        <p
          data-section-title-item
          className="type-body max-w-2xl"
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}
