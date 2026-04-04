import AnimatedSection from "../components/AnimatedSection";
import SectionTitle from "../components/SectionTitle";

export default function ContactSection({ isActive = false }) {
  return (
    <AnimatedSection
      id="contact"
      animation="contact"
      isActive={isActive}
      data-section
      data-parallax-scope
      data-contact-section
      className="content-panel section-shell section-frame relative isolate overflow-hidden"
    >
      <div
        data-parallax
        data-speed="slow"
        className="parallax-atmosphere pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_12%,rgba(154,110,245,0.08),transparent_24%),radial-gradient(circle_at_82%_78%,rgba(76,231,255,0.08),transparent_20%)]"
      />
      <div className="parallax-fog pointer-events-none absolute inset-x-0 bottom-0 h-24" />
      <div className="section-noise-guard" aria-hidden="true" />

      <div className="relative z-10 grid gap-5 sm:gap-6 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:items-stretch">
        <div
          data-parallax
          data-speed="medium"
          data-parallax-x="right"
        >
          <div
            data-contact-panel
            className="glass-panel flex h-full flex-col justify-between rounded-[1.75rem] p-4 sm:p-6 lg:p-7"
          >
            <SectionTitle
              eyebrow="Contact"
              title="Let's Connect"
              subtitle="Available for internships, collaboration, and frontend-focused product work."
              description="If you have a project or role where interface quality matters, reach out and I'll be happy to continue the conversation."
            />

            <div
              data-contact-item
              className="mt-8 rounded-[1.4rem] border border-white/12 bg-slate-950/64 px-4 py-4 text-sm leading-6 text-slate-200 sm:px-5"
            >
              Open to internship opportunities, remote-friendly collaboration,
              and practical digital product work.
            </div>
          </div>
        </div>

        <div
          data-parallax
          data-speed="medium"
          data-parallax-x="left"
        >
          <div
            data-contact-panel
            className="glass-panel flex h-full flex-col rounded-[1.75rem] p-4 sm:p-6 lg:p-7"
          >
            <p className="type-label text-slate-300">
              Contact Details
            </p>

            <div className="mt-6 grid gap-3 text-slate-200 md:grid-cols-2">
              <div
                data-contact-item
                className="rounded-[1.25rem] border border-white/12 bg-slate-950/68 px-4 py-4"
              >
                <p className="type-meta text-slate-400">
                  Email
                </p>
                <a
                  href="mailto:lspasindum1720@gmail.com"
                  className="contact-link mt-2 text-[0.98rem] font-medium text-white transition hover:text-cyan-100"
                >
                  lspasindum1720@gmail.com
                </a>
              </div>

              <div
                data-contact-item
                className="rounded-[1.25rem] border border-white/12 bg-slate-950/68 px-4 py-4"
              >
                <p className="type-meta text-slate-400">
                  LinkedIn
                </p>
                <a
                  href="https://www.linkedin.com/in/sahan-pasindu-483623320"
                  target="_blank"
                  rel="noreferrer"
                  className="contact-link mt-2 text-[0.98rem] font-medium text-white transition hover:text-cyan-100"
                >
                  linkedin.com/in/sahan-pasindu
                </a>
              </div>

              <div
                data-contact-item
                className="rounded-[1.25rem] border border-white/12 bg-slate-950/68 px-4 py-4"
              >
                <p className="type-meta text-slate-400">
                  GitHub
                </p>
                <a
                  href="https://github.com/sahanpasindu-123"
                  target="_blank"
                  rel="noreferrer"
                  className="contact-link mt-2 text-[0.98rem] font-medium text-white transition hover:text-cyan-100"
                >
                  github.com/sahanpasindu-123
                </a>
              </div>

              <div
                data-contact-item
                className="rounded-[1.25rem] border border-white/12 bg-slate-950/68 px-4 py-4"
              >
                <p className="type-meta text-slate-400">
                  Availability
                </p>
                <p className="mt-2 text-[0.98rem] leading-6 text-white">
                  Open to internships and collaboration opportunities
                </p>
              </div>
            </div>

            <a
              href="mailto:lspasindum1720@gmail.com"
              data-contact-item
              data-button-hover
              className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-gradient-to-r from-[#9A6EF5] to-[#4CE7FF] px-6 py-3 font-medium text-slate-950 shadow-[0_16px_40px_rgba(76,231,255,0.18)] transition hover:scale-[1.02] sm:mt-auto"
            >
              Start a Conversation
            </a>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}
