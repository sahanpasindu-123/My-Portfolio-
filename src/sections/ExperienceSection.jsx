import AnimatedSection from "../components/AnimatedSection";
import ExperienceTimelineCard from "../components/ExperienceTimelineCard";
import SectionTitle from "../components/SectionTitle";

const experiences = [
  {
    role: "Intern",
    company: "People's Bank",
    period: "2023-2024",
    summary:
      "Worked in a fast-paced banking environment where I strengthened practical problem solving, learned to communicate clearly with clients, and adapted quickly to day-to-day operational demands.",
    points: [
      "Problem solving across day-to-day operational challenges",
      "Client interaction with clear and professional communication",
      "Experience working effectively in a fast-paced environment",
    ],
  },
];

export default function ExperienceSection({ isActive = false }) {
  return (
    <AnimatedSection
      id="experience"
      animation="experience"
      isActive={isActive}
      data-section
      data-parallax-scope
      className="content-panel section-shell section-frame relative isolate overflow-hidden"
    >
      <div
        data-parallax
        data-speed="slow"
        className="parallax-atmosphere pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_82%_18%,rgba(154,110,245,0.08),transparent_24%),radial-gradient(circle_at_8%_85%,rgba(76,231,255,0.08),transparent_20%)]"
      />
      <div className="parallax-fog pointer-events-none absolute inset-x-0 top-0 h-24" />
      <div className="section-noise-guard" aria-hidden="true" />

      <div className="relative z-10 grid gap-6 sm:gap-8 lg:grid-cols-[minmax(0,0.86fr)_minmax(0,1.14fr)] lg:items-start">
        <SectionTitle
          eyebrow="Experience"
          title="Experience"
          subtitle="Practical work shaped by problem solving, client communication, and dependable execution."
          description="A concise look at the environment that strengthened adaptability and day-to-day delivery."
        />

        <div className="space-y-5 sm:space-y-6 lg:ml-auto lg:max-w-3xl">
          {experiences.map((experience, index) => (
            <div
              key={`${experience.company}-${experience.period}`}
              data-parallax
              data-speed="medium"
              data-parallax-x="right"
            >
              <ExperienceTimelineCard
                {...experience}
                isFirst={index === 0}
                isLast={index === experiences.length - 1}
              />
            </div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}
