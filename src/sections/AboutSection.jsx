import AnimatedSection from "../components/AnimatedSection";
import profileImg from "../assets/profile.png";

export default function AboutSection({ isActive = false }) {
  const sectionStyle = {
    background: isActive
      ? "linear-gradient(150deg, rgba(6, 13, 22, 0.97) 0%, rgba(7, 14, 24, 0.95) 52%, rgba(4, 8, 15, 0.98) 100%)"
      : "linear-gradient(150deg, rgba(7, 15, 25, 0.95) 0%, rgba(8, 15, 25, 0.93) 52%, rgba(5, 9, 17, 0.96) 100%)",
    opacity: isActive ? 1 : 0.94,
    filter: isActive
      ? "brightness(1.03) saturate(1.02)"
      : "brightness(0.97) saturate(0.94)",
  };

  const focusBackdropStyle = {
    background: isActive
      ? "linear-gradient(180deg, rgba(2, 6, 12, 0.3) 0%, rgba(2, 6, 12, 0.18) 42%, rgba(2, 6, 12, 0.34) 100%), radial-gradient(circle at 18% 24%, rgba(255, 255, 255, 0.035), transparent 30%)"
      : "linear-gradient(180deg, rgba(2, 6, 12, 0.26) 0%, rgba(2, 6, 12, 0.14) 42%, rgba(2, 6, 12, 0.28) 100%), radial-gradient(circle at 18% 24%, rgba(255, 255, 255, 0.028), transparent 30%)",
    backdropFilter: isActive ? "blur(22px) saturate(132%)" : "blur(18px) saturate(124%)",
    WebkitBackdropFilter: isActive ? "blur(22px) saturate(132%)" : "blur(18px) saturate(124%)",
    opacity: isActive ? 1 : 0.88,
  };

  const storyPanelStyle = {
    background: isActive
      ? "linear-gradient(180deg, rgba(8, 16, 28, 0.94) 0%, rgba(8, 16, 28, 0.86) 100%)"
      : "linear-gradient(180deg, rgba(8, 16, 28, 0.91) 0%, rgba(8, 16, 28, 0.8) 100%)",
    backdropFilter: "blur(18px) saturate(128%)",
    WebkitBackdropFilter: "blur(18px) saturate(128%)",
  };

  const detailPanelStyle = {
    background: isActive
      ? "linear-gradient(180deg, rgba(10, 19, 32, 0.92) 0%, rgba(10, 19, 32, 0.84) 100%)"
      : "linear-gradient(180deg, rgba(10, 19, 32, 0.88) 0%, rgba(10, 19, 32, 0.78) 100%)",
    backdropFilter: "blur(16px) saturate(122%)",
    WebkitBackdropFilter: "blur(16px) saturate(122%)",
  };

  const mediaPanelStyle = {
    background: isActive
      ? "radial-gradient(circle at 50% 14%, rgba(255, 255, 255, 0.035), transparent 34%), linear-gradient(180deg, rgba(8, 16, 28, 0.9) 0%, rgba(8, 16, 28, 0.82) 100%)"
      : "radial-gradient(circle at 50% 14%, rgba(255, 255, 255, 0.028), transparent 34%), linear-gradient(180deg, rgba(8, 16, 28, 0.86) 0%, rgba(8, 16, 28, 0.78) 100%)",
    backdropFilter: isActive ? "blur(18px) saturate(126%)" : "blur(16px) saturate(122%)",
    WebkitBackdropFilter: isActive ? "blur(18px) saturate(126%)" : "blur(16px) saturate(122%)",
  };

  return (
    <AnimatedSection
      id="about"
      animation="about"
      isActive={isActive}
      data-section
      data-parallax-scope
      data-about-section
      className={`content-panel relative isolate overflow-hidden rounded-[2.25rem] border px-6 py-16 shadow-[0_28px_90px_rgba(2,6,23,0.45)] transition-[border-color,box-shadow,filter,opacity] duration-500 sm:px-10 ${
        isActive
          ? "border-white/18 shadow-[0_38px_120px_rgba(2,6,23,0.64)]"
          : "border-white/14 shadow-[0_30px_98px_rgba(2,6,23,0.54)]"
      }`}
      style={sectionStyle}
    >
      <div
        data-parallax
        data-speed="slow"
        className="parallax-atmosphere absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 12% 18%, rgba(154, 110, 245, 0.075), transparent 24%), radial-gradient(circle at 88% 80%, rgba(76, 231, 255, 0.06), transparent 22%), linear-gradient(145deg, rgba(5, 10, 18, 0.98) 0%, rgba(7, 13, 23, 0.95) 55%, rgba(4, 8, 15, 0.99) 100%)",
        }}
      />
      <div
        data-parallax
        data-speed="slow"
        data-parallax-x="right"
        className="parallax-atmosphere absolute inset-y-0 left-0 w-full lg:w-[58%]"
        style={{
          background:
            "linear-gradient(90deg, rgba(4, 8, 15, 0.9) 0%, rgba(4, 8, 15, 0.74) 55%, rgba(4, 8, 15, 0.22) 100%)",
        }}
      />
      <div className="parallax-fog pointer-events-none absolute inset-x-0 top-0 h-28" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[2] transition-opacity duration-500"
        style={focusBackdropStyle}
      />
      <div
        className="section-noise-guard"
        aria-hidden="true"
        style={{ opacity: isActive ? 0.98 : 0.84 }}
      />

      <div className="relative z-10 grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-stretch">
        <div
          data-parallax
          data-speed="medium"
          data-parallax-x="right"
          className="flex"
        >
          <div
            data-about-copy
            className={`relative w-full overflow-hidden rounded-[1.75rem] border p-7 transition-[border-color,box-shadow,filter] duration-500 sm:p-8 ${
              isActive
                ? "border-white/16 shadow-[0_26px_82px_rgba(2,6,23,0.46)]"
                : "border-white/12 shadow-[0_22px_68px_rgba(2,6,23,0.36)]"
            }`}
            style={storyPanelStyle}
          >
            <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-white/[0.045] via-white/[0.015] to-transparent" />
            <div className="relative space-y-7">
              <p className="inline-flex rounded-full border border-white/14 bg-white/[0.1] px-4 py-2 text-xs font-semibold uppercase tracking-[0.32em] text-[#D8CBFF]">
                About Me
              </p>

              <div className="space-y-5">
                <h2 className="max-w-3xl text-3xl font-bold leading-tight tracking-tight text-white sm:text-[2.45rem] lg:text-[2.85rem]">
                  Frontend Developer Building Scalable User Experiences
                </h2>
                <p className="max-w-2xl text-[1.06rem] leading-[1.95] text-slate-100 sm:text-[1.12rem]">
                  I am an IT undergraduate at the University of Kelaniya with a
                  strong interest in frontend development and modern web
                  technologies, supported by UI/UX design skills. I enjoy
                  building clean, user-friendly web interfaces while learning
                  best practices, and I continue improving through real-world
                  projects that help me create practical and scalable
                  applications.
                </p>
              </div>

              <div
                className="rounded-[1.5rem] border border-white/10 p-6 shadow-[0_18px_56px_rgba(2,6,23,0.3)]"
                style={detailPanelStyle}
              >
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-300">
                      Education
                    </p>
                    <p className="mt-3 text-lg font-semibold text-white">
                      University of Kelaniya
                    </p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-300">
                      Focus
                    </p>
                    <p className="mt-3 text-lg font-semibold text-white">
                      Frontend + UI/UX
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          data-parallax
          data-speed="medium"
          data-parallax-x="left"
          data-mouse-parallax
          className="flex"
        >
          <div
            data-about-media
            className={`relative flex w-full items-center justify-center overflow-hidden rounded-[1.75rem] border p-4 transition-[border-color,box-shadow,filter] duration-500 sm:p-6 ${
              isActive
                ? "border-white/14 shadow-[0_26px_82px_rgba(2,6,23,0.42)]"
                : "border-white/10 shadow-[0_20px_64px_rgba(2,6,23,0.34)]"
            }`}
            style={mediaPanelStyle}
          >
            <div className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-white/[0.04] to-transparent" />
            <img
              src={profileImg}
              alt="Sahan Pasindu"
              className={`relative w-full max-w-md rounded-[1.6rem] border transition-transform duration-500 hover:scale-[1.02] ${
                isActive
                  ? "border-white/16 shadow-[0_24px_72px_rgba(2,6,23,0.46)]"
                  : "border-white/12 shadow-[0_22px_60px_rgba(2,6,23,0.38)]"
              }`}
            />
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}
