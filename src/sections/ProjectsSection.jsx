import AnimatedSection from "../components/AnimatedSection";
import SectionTitle from "../components/SectionTitle";

const projects = [
  {
    title: "Inventory Management System",
    description:
      "Full-stack system developed for Liyanage Motors with inventory tracking, reservation handling, and dashboard-driven workflows for daily operations.",
    techStack: ["React", "Node.js", "MySQL"],
    githubUrl: "https://github.com/sahanpasindu-123/SDP_NextOne_fixed_v2.git",
    accent: "from-[#9A6EF5]/70 via-[#4CE7FF]/45 to-transparent",
  },
  {
    title: "AI-Based Science Learning System",
    description:
      "NLP-based adaptive quiz platform designed to personalize science learning with intelligent question flow and AI-assisted evaluation.",
    techStack: ["Python", "Flask", "SQLite", "Gemini API"],
    githubUrl: "https://github.com/sahanpasindu-123/Ai-project.git",
    accent: "from-[#4CE7FF]/70 via-[#9A6EF5]/40 to-transparent",
  },
  {
    title: "Distributed File Storage System",
    description:
      "Secure upload and download platform built around distributed object storage, containerized services, and dependable file handling.",
    techStack: ["Node.js", "React", "Docker", "MinIO"],
    githubUrl: "https://github.com/sahanpasindu-123/DistributedSystem.git",
    accent: "from-[#9A6EF5]/60 via-[#4CE7FF]/50 to-transparent",
  },
  {
    title: "Web Auth System",
    description:
      "Authentication platform featuring JWT-based access control, email verification, and password reset flows for production-ready account management.",
    techStack: ["Node.js", "MongoDB"],
    githubUrl: "https://github.com/sahanpasindu-123/Web-Auth-System.git",
    accent: "from-[#4CE7FF]/55 via-[#9A6EF5]/50 to-transparent",
  },
];

function GitHubIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="h-5 w-5"
    >
      <path d="M12 2C6.48 2 2 6.58 2 12.22c0 4.5 2.87 8.31 6.84 9.66.5.1.68-.22.68-.5 0-.24-.01-1.03-.01-1.87-2.78.62-3.37-1.21-3.37-1.21-.45-1.19-1.11-1.5-1.11-1.5-.91-.64.07-.63.07-.63 1 .08 1.53 1.06 1.53 1.06.9 1.57 2.35 1.12 2.92.86.09-.67.35-1.12.63-1.38-2.22-.26-4.56-1.15-4.56-5.14 0-1.14.4-2.08 1.05-2.81-.11-.27-.46-1.35.1-2.8 0 0 .86-.28 2.82 1.07A9.6 9.6 0 0 1 12 6.91c.85 0 1.7.12 2.5.36 1.96-1.35 2.82-1.07 2.82-1.07.56 1.45.21 2.53.1 2.8.65.73 1.05 1.67 1.05 2.81 0 4-2.35 4.87-4.58 5.13.36.32.68.95.68 1.92 0 1.39-.01 2.5-.01 2.84 0 .28.18.61.69.5A10.23 10.23 0 0 0 22 12.22C22 6.58 17.52 2 12 2Z" />
    </svg>
  );
}

export default function ProjectsSection({ isActive = false }) {
  return (
    <AnimatedSection
      id="projects"
      animation="projects"
      isActive={isActive}
      data-section
      data-parallax-scope
      className="content-panel section-frame relative isolate overflow-hidden rounded-[2rem] border border-white/12 bg-[#0B1320]/90 shadow-[0_32px_120px_rgba(2,6,23,0.55)] sm:rounded-[2.3rem]"
    >
      <div
        data-parallax
        data-speed="slow"
        className="parallax-atmosphere absolute inset-0 bg-[radial-gradient(circle_at_8%_12%,rgba(154,110,245,0.12),transparent_24%),radial-gradient(circle_at_92%_18%,rgba(76,231,255,0.1),transparent_20%),linear-gradient(180deg,rgba(11,19,32,0.98),rgba(9,14,24,0.92))]"
      />
      <div
        data-parallax
        data-speed="slow"
        data-parallax-x="left"
        className="parallax-atmosphere absolute -left-16 top-16 h-52 w-52 rounded-full bg-[#9A6EF5]/12 blur-3xl animate-float-slow"
      />
      <div
        data-parallax
        data-speed="slow"
        data-parallax-x="right"
        className="parallax-atmosphere absolute right-0 top-10 h-56 w-56 rounded-full bg-[#4CE7FF]/12 blur-3xl animate-float-reverse"
      />
      <div
        data-parallax
        data-speed="slow"
        data-parallax-x="right"
        className="parallax-atmosphere absolute inset-[-12%] opacity-35 blur-3xl animate-aurora bg-[conic-gradient(from_180deg_at_50%_50%,rgba(154,110,245,0.12),rgba(76,231,255,0.08),rgba(154,110,245,0.12))]"
      />
      <div className="parallax-fog pointer-events-none absolute inset-x-0 bottom-0 h-28" />
      <div className="section-noise-guard" aria-hidden="true" />

      <div className="section-stack">
        <div className="flex flex-col gap-5 xl:flex-row xl:items-end xl:justify-between">
          <SectionTitle
            eyebrow="Projects"
            title="Selected Projects"
            subtitle="Implementation-focused builds across product interfaces, backend systems, and AI-assisted workflows."
            description="Each project surfaces the product problem, core functionality, and the stack behind the build."
          />

          <div
            data-parallax
            data-speed="fast"
            data-parallax-x="left"
            className="xl:max-w-sm"
          >
            <div
              data-project-aside
              className="glass-panel rounded-[1.6rem] px-4 py-4 text-sm leading-6 text-slate-200 sm:px-5"
            >
              Selected work across full-stack systems, AI-assisted learning,
              secure storage workflows, and production-ready authentication.
            </div>
          </div>
        </div>

        <div className="grid gap-5 lg:grid-cols-2 lg:gap-6">
          {projects.map((project, index) => (
            <div
              key={project.title}
              data-parallax
              data-speed="medium"
              data-parallax-x={index % 2 === 0 ? "right" : "left"}
            >
              <article
                data-project-card
                className="group relative h-full rounded-[1.9rem] bg-gradient-to-br from-white/12 via-transparent to-white/6 p-[1px] transition duration-500 hover:scale-[1.02]"
              >
                <div
                  className={`absolute inset-0 rounded-[1.9rem] bg-gradient-to-br ${project.accent} opacity-45 blur-2xl transition duration-500 group-hover:opacity-70`}
                />

                <div className="glass-panel relative flex h-full flex-col overflow-hidden rounded-[calc(1.9rem-1px)] bg-[#0B1320]/92 p-4 sm:p-5 lg:p-6">
                  <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-[#4CE7FF]/75 to-transparent" />
                  <div className="absolute -right-12 top-0 h-32 w-32 rounded-full bg-[#9A6EF5]/12 blur-3xl transition duration-500 group-hover:bg-[#4CE7FF]/12" />

                  <div className="flex min-w-0 items-start justify-between gap-3">
                    <div className="min-w-0 space-y-4">
                      <span className="pill type-label border-white/12 bg-white/[0.08] px-3 py-2 sm:px-4">
                        Project
                      </span>
                      <h3 className="type-card-title max-w-xl text-white">
                        {project.title}
                      </h3>
                    </div>

                    <div className="hidden h-11 w-11 rounded-[0.95rem] bg-[linear-gradient(135deg,rgba(154,110,245,0.24),rgba(76,231,255,0.14))] shadow-[0_0_24px_rgba(76,231,255,0.08)] sm:block" />
                  </div>

                  <p className="type-card-body mt-4 flex-1 sm:mt-5">
                    {project.description}
                  </p>

                  <div className="mt-5 flex flex-wrap gap-2.5">
                    {project.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-full border border-white/12 bg-slate-950/72 px-4 py-2 text-sm font-medium text-slate-100"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="mt-6 flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between lg:mt-7">
                    <p className="type-meta text-slate-400">
                      Repository
                    </p>
                    <a
                      href={project.githubUrl}
                      data-button-hover
                      className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/12 bg-gradient-to-r from-[#9A6EF5]/18 to-[#4CE7FF]/18 px-5 py-3 text-sm font-medium text-white transition duration-300 hover:border-[#4CE7FF]/30 hover:bg-gradient-to-r hover:from-[#9A6EF5]/26 hover:to-[#4CE7FF]/26 sm:w-auto"
                    >
                      <GitHubIcon />
                      View on GitHub
                    </a>
                  </div>
                </div>
              </article>
            </div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}
