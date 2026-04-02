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
      className="content-panel section-shell relative isolate overflow-hidden px-6 py-16 sm:px-10"
    >
      <div
        data-parallax
        data-speed="slow"
        className="parallax-atmosphere pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_12%,rgba(154,110,245,0.08),transparent_24%),radial-gradient(circle_at_82%_78%,rgba(76,231,255,0.08),transparent_20%)]"
      />
      <div className="parallax-fog pointer-events-none absolute inset-x-0 bottom-0 h-24" />
      <div className="section-noise-guard" aria-hidden="true" />

      <div className="relative z-10 grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
        <SectionTitle
          eyebrow="Contact"
          title="Have an idea, product, or freelance project to build?"
          description="Replace the contact details below with your email, LinkedIn, GitHub, or a working contact form."
        />

        <div
          data-parallax
          data-speed="medium"
          data-parallax-x="left"
        >
          <div
            data-contact-panel
            className="glass-panel rounded-[1.75rem] p-6 sm:min-w-[320px]"
          >
            <div className="space-y-4 text-slate-200">
              <p data-contact-item>
                Email:{" "}
                <a
                  href="mailto:lspasindum1720@gmail.com"
                  className="text-white transition hover:text-cyan-100"
                >
                  lspasindum1720@gmail.com
                </a>
              </p>
              <p data-contact-item>
                LinkedIn:{" "}
                <a
                  href="#"
                  className="text-white transition hover:text-cyan-100"
                >
                  linkedin.com/in/sahan
                </a>
              </p>
              <p data-contact-item>
                GitHub:{" "}
                <a
                  href="#"
                  className="text-white transition hover:text-cyan-100"
                >
                  github.com/sahan
                </a>
              </p>
            </div>

            <a
              href="mailto:lspasindum1720@gmail.com"
              data-contact-item
              data-button-hover
              className="mt-6 inline-flex rounded-full bg-gradient-to-r from-[#9A6EF5] to-[#4CE7FF] px-6 py-3 font-medium text-slate-950 shadow-[0_16px_40px_rgba(76,231,255,0.18)] transition hover:scale-[1.02]"
            >
              Contact Me
            </a>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}
