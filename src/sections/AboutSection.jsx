import AnimatedSection from "../components/AnimatedSection";
import profileImg from "../assets/profile.png";

export default function AboutSection() {
  return (
    <AnimatedSection
      id="about"
      animation="about"
      data-section
      data-about-section
      className="content-panel relative isolate overflow-hidden rounded-[2.25rem] border border-white/10 bg-white/[0.03] px-6 py-16 shadow-[0_28px_90px_rgba(2,6,23,0.45)] sm:px-10"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_18%,rgba(154,110,245,0.16),transparent_24%),radial-gradient(circle_at_90%_82%,rgba(76,231,255,0.12),transparent_20%)]" />

      <div className="relative grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
        <div data-about-copy className="space-y-6">
          <p className="inline-flex rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 text-xs font-medium uppercase tracking-[0.3em] text-[#9A6EF5]">
            About Me
          </p>

          <div className="space-y-4">
            <h2 className="max-w-3xl text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Frontend Developer Building Scalable User Experiences
            </h2>
            <p className="text-base leading-8 text-slate-300 sm:text-lg">
              I am an IT undergraduate at the University of Kelaniya with a
              strong interest in frontend development and modern web
              technologies, supported by UI/UX design skills. I enjoy building
              clean, user-friendly web interfaces while learning best practices,
              and I continue improving through real-world projects that help me
              create practical and scalable applications.
            </p>
          </div>

          <div className="glass-panel rounded-[1.75rem] p-6">
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <p className="text-xs uppercase tracking-[0.28em] text-slate-400">
                  Education
                </p>
                <p className="mt-3 text-lg font-medium text-white">
                  University of Kelaniya
                </p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.28em] text-slate-400">
                  Focus
                </p>
                <p className="mt-3 text-lg font-medium text-white">
                  Frontend + UI/UX
                </p>
              </div>
            </div>
          </div>
        </div>

        <div
          data-about-media
          className="glass-panel flex items-center justify-center rounded-[1.75rem] p-4 sm:p-6"
        >
          <img
            src={profileImg}
            alt="Sahan Pasindu"
            className="w-full max-w-md rounded-2xl shadow-lg transition-transform duration-500 hover:scale-[1.03]"
          />
        </div>
      </div>
    </AnimatedSection>
  );
}
