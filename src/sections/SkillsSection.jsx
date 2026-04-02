import SectionTitle from "../components/SectionTitle";
import SkillCategoryCard from "../components/SkillCategoryCard";

const skillCategories = [
  {
    title: "Frontend & UI/UX",
    description:
      "Designing clear interfaces and building polished frontend experiences with modern web tools.",
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

export default function SkillsSection() {
  return (
    <section
      id="skills"
      className="section-shell relative isolate overflow-hidden px-6 py-14 sm:px-8 lg:px-10"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_14%,rgba(154,110,245,0.14),transparent_24%),radial-gradient(circle_at_86%_80%,rgba(76,231,255,0.12),transparent_20%)]" />

      <div className="relative space-y-10">
        <SectionTitle
          eyebrow="Skills"
          title="Technical strengths organized into focused areas of design and development."
          description="Each category is structured as a reusable card so the section can grow without turning into a wall of text."
        />

        <div className="grid gap-6 xl:grid-cols-2">
          {skillCategories.map((category) => (
            <SkillCategoryCard key={category.title} {...category} />
          ))}
        </div>
      </div>
    </section>
  );
}
