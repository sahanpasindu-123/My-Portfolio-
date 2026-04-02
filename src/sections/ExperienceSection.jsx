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

export default function ExperienceSection() {
  return (
    <section
      id="experience"
      className="section-shell relative isolate overflow-hidden px-6 py-14 sm:px-8 lg:px-10"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_82%_18%,rgba(154,110,245,0.12),transparent_24%),radial-gradient(circle_at_8%_85%,rgba(76,231,255,0.12),transparent_20%)]" />

      <div className="relative space-y-10">
        <SectionTitle
          eyebrow="Experience"
          title="Hands-on experience shaped by real clients, constraints, and delivery pressure."
          description="A concise timeline layout keeps the section readable now and leaves room to add more roles later."
        />

        <div className="space-y-8">
          {experiences.map((experience) => (
            <ExperienceTimelineCard
              key={`${experience.company}-${experience.period}`}
              {...experience}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
