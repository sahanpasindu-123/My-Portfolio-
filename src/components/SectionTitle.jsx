export default function SectionTitle({ eyebrow, title, description }) {
  return (
    <div
      data-section-title
      data-parallax
      data-speed="medium"
      className="max-w-2xl space-y-5"
    >
      <p data-section-title-item className="pill bg-white/[0.08]">
        {eyebrow}
      </p>
      <h2
        data-section-title-item
        className="text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-[2.8rem]"
      >
        {title}
      </h2>
      <p
        data-section-title-item
        className="max-w-2xl text-[1.02rem] leading-8 text-slate-200 sm:text-lg"
      >
        {description}
      </p>
    </div>
  );
}
