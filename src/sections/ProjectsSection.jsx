import SectionTitle from "../components/SectionTitle";

const projects = [
  {
    title: "Inventory Management System",
    description:
      "Full-stack system developed for Liyanage Motors with inventory tracking, reservation handling, and dashboard-driven workflows for daily operations.",
    techStack: ["React", "Node.js", "MySQL"],
    githubUrl: "#",
    accent: "from-[#9A6EF5]/70 via-[#4CE7FF]/45 to-transparent",
  },
  {
    title: "AI-Based Science Learning System",
    description:
      "NLP-based adaptive quiz platform designed to personalize science learning with intelligent question flow and AI-assisted evaluation.",
    techStack: ["Python", "Flask", "SQLite", "Gemini API"],
    githubUrl: "#",
    accent: "from-[#4CE7FF]/70 via-[#9A6EF5]/40 to-transparent",
  },
  {
    title: "Distributed File Storage System",
    description:
      "Secure upload and download platform built around distributed object storage, containerized services, and dependable file handling.",
    techStack: ["Node.js", "React", "Docker", "MinIO"],
    githubUrl: "#",
    accent: "from-[#9A6EF5]/60 via-[#4CE7FF]/50 to-transparent",
  },
  {
    title: "Web Auth System",
    description:
      "Authentication platform featuring JWT-based access control, email verification, and password reset flows for production-ready account management.",
    techStack: ["Node.js", "MongoDB"],
    githubUrl: "#",
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

export default function ProjectsSection() {
  return (
    <section
      id="projects"
      className="relative isolate overflow-hidden rounded-[2.4rem] border border-white/10 bg-[#0D1220]/80 px-6 py-16 shadow-[0_32px_120px_rgba(2,6,23,0.55)] sm:px-8 lg:px-10"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_8%_12%,rgba(154,110,245,0.18),transparent_24%),radial-gradient(circle_at_92%_18%,rgba(76,231,255,0.16),transparent_20%),linear-gradient(180deg,rgba(13,18,32,0.96),rgba(11,15,25,0.86))]" />
      <div className="absolute -left-16 top-16 h-52 w-52 rounded-full bg-[#9A6EF5]/20 blur-3xl animate-float-slow" />
      <div className="absolute right-0 top-10 h-56 w-56 rounded-full bg-[#4CE7FF]/16 blur-3xl animate-float-reverse" />
      <div className="absolute inset-[-12%] opacity-50 blur-3xl animate-aurora bg-[conic-gradient(from_180deg_at_50%_50%,rgba(154,110,245,0.18),rgba(76,231,255,0.12),rgba(154,110,245,0.18))]" />

      <div className="relative space-y-10">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionTitle
            eyebrow="Projects"
            title="Selected builds focused on implementation, problem solving, and practical product development."
            description="Each project highlights technical scope, core functionality, and the stack behind the build."
          />

          <div className="glass-panel max-w-md rounded-[1.75rem] px-5 py-4 text-sm leading-7 text-slate-300">
            Selected work across full-stack systems, AI-assisted learning, secure
            storage workflows, and production-ready authentication.
          </div>
        </div>

        <div className="grid gap-6 xl:grid-cols-2">
          {projects.map((project) => (
            <article
              key={project.title}
              className="group relative rounded-[2rem] bg-gradient-to-br from-white/10 via-transparent to-white/5 p-[1px] transition duration-500 hover:scale-[1.02]"
            >
              <div
                className={`absolute inset-0 rounded-[2rem] bg-gradient-to-br ${project.accent} opacity-70 blur-2xl transition duration-500 group-hover:opacity-100`}
              />

              <div className="glass-panel relative flex h-full flex-col overflow-hidden rounded-[calc(2rem-1px)] bg-[#0F172A]/80 p-6">
                <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-[#4CE7FF]/75 to-transparent" />
                <div className="absolute -right-12 top-0 h-32 w-32 rounded-full bg-[#9A6EF5]/16 blur-3xl transition duration-500 group-hover:bg-[#4CE7FF]/16" />

                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-4">
                    <span className="inline-flex rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 text-xs font-medium uppercase tracking-[0.28em] text-[#4CE7FF]">
                      Project Build
                    </span>
                    <h3 className="max-w-xl text-2xl font-semibold tracking-tight text-white">
                      {project.title}
                    </h3>
                  </div>

                  <div className="h-12 w-12 rounded-[1rem] bg-[linear-gradient(135deg,rgba(154,110,245,0.3),rgba(76,231,255,0.18))] shadow-[0_0_35px_rgba(76,231,255,0.12)]" />
                </div>

                <p className="mt-6 flex-1 leading-8 text-slate-300">
                  {project.description}
                </p>

                <div className="mt-6 flex flex-wrap gap-3">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full border border-white/10 bg-slate-950/55 px-4 py-2 text-sm font-medium text-slate-200"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="mt-8 flex items-center justify-between gap-4">
                  <p className="text-xs uppercase tracking-[0.26em] text-slate-500">
                    GitHub Repository
                  </p>
                  <a
                    href={project.githubUrl}
                    className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-gradient-to-r from-[#9A6EF5]/20 to-[#4CE7FF]/20 px-5 py-3 text-sm font-medium text-white transition duration-300 hover:border-[#4CE7FF]/30 hover:bg-gradient-to-r hover:from-[#9A6EF5]/30 hover:to-[#4CE7FF]/30"
                  >
                    <GitHubIcon />
                    View on GitHub
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
