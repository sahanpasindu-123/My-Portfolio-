import SectionTitle from "../components/SectionTitle";

export default function ContactSection() {
  return (
    <section id="contact" className="section-shell px-6 py-16 sm:px-10">
      <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
        <SectionTitle
          eyebrow="Contact"
          title="Have an idea, product, or freelance project to build?"
          description="Replace the contact details below with your email, LinkedIn, GitHub, or a working contact form."
        />

        <div className="glass-panel rounded-[1.75rem] p-6 sm:min-w-[320px]">
          <div className="space-y-4 text-slate-300">
            <p>
              Email:{" "}
              <a
                href="mailto:sahan@example.com"
                className="text-white transition hover:text-cyan-200"
              >
                sahan@example.com
              </a>
            </p>
            <p>
              LinkedIn:{" "}
              <a href="#" className="text-white transition hover:text-cyan-200">
                linkedin.com/in/sahan
              </a>
            </p>
            <p>
              GitHub:{" "}
              <a href="#" className="text-white transition hover:text-cyan-200">
                github.com/sahan
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
