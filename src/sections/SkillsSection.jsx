import AnimatedSection from "../components/AnimatedSection";
import SectionTitle from "../components/SectionTitle";
import SkillCategoryCard from "../components/SkillCategoryCard";

const skillCategories = [
  {
    title: "Frontend Development",
    description:
      "Building clear, responsive web interfaces with HTML, CSS, JavaScript, React.js, and UI/UX awareness.",
    icon: "design",
    skills: [
      { name: "Figma", icon: "design" },
      { name: "HTML", icon: "markup" },
      { name: "CSS", icon: "style" },
      { name: "JavaScript", icon: "code" },
      { name: "React.js", icon: "react" },
    ],
  },
  {
    title: "Backend",
    description:
      "Developing APIs and application logic that support secure, scalable user-facing products.",
    icon: "server",
    skills: [
      { name: "Node.js", icon: "server" },
      { name: "Express.js", icon: "server" },
      { name: "REST APIs", icon: "api" },
      { name: "JWT", icon: "auth" },
    ],
  },
  {
    title: "Databases",
    description:
      "Working with structured and document-based databases to manage reliable application data.",
    icon: "database",
    skills: [
      { name: "MongoDB", icon: "database" },
      { name: "MySQL", icon: "database" },
    ],
  },
  {
    title: "Tools",
    description:
      "Using practical development tools for version control, testing, delivery, and containerized workflows.",
    icon: "tool",
    skills: [
      { name: "Git", icon: "git" },
      { name: "GitHub", icon: "git" },
      { name: "Postman", icon: "api" },
      { name: "Docker", icon: "docker" },
    ],
  },
];

export default function SkillsSection({ isActive = false }) {
  return (
    <AnimatedSection
      id="skills"
      animation="skills"
      isActive={isActive}
      data-section
      data-parallax-scope
      data-skills-section
      className="content-panel section-shell relative isolate overflow-hidden px-6 py-14 sm:px-8 lg:px-10"
    >
      <div
        data-parallax
        data-speed="slow"
        className="parallax-atmosphere pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_14%,rgba(154,110,245,0.08),transparent_24%),radial-gradient(circle_at_86%_80%,rgba(76,231,255,0.08),transparent_20%)]"
      />
      <div
        data-parallax
        data-speed="slow"
        data-parallax-x="right"
        className="parallax-atmosphere pointer-events-none absolute -right-12 top-10 h-36 w-36 rounded-full bg-[#4CE7FF]/8 blur-3xl"
      />
      <div className="parallax-fog pointer-events-none absolute inset-x-0 bottom-0 h-24" />
      <div className="section-noise-guard" aria-hidden="true" />

      <div className="relative z-10 space-y-10">
        <SectionTitle
          eyebrow="Skills"
          title="Technical strengths organized around frontend, backend, databases, and development tools."
          description="Each category keeps the stack readable while highlighting the tools used to build practical applications."
        />

        <div className="grid gap-6 xl:grid-cols-2">
          {skillCategories.map((category, index) => (
            <div
              key={category.title}
              data-parallax
              data-speed="medium"
              data-parallax-x={index % 2 === 0 ? "right" : "left"}
            >
              <SkillCategoryCard {...category} />
            </div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}
