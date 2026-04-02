import { useActiveSection } from "../hooks/useActiveSection";

const NAV_ITEMS = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
];

const SECTION_IDS = NAV_ITEMS.map((item) => item.id);

export default function Navbar() {
  const activeSection = useActiveSection(SECTION_IDS);

  return (
    <header className="sticky top-0 z-50 px-4 pt-4 sm:px-6 lg:px-8">
      <nav
        data-navbar-shell
        className="navbar-shell mx-auto max-w-6xl rounded-full border border-white/10 px-5 py-4"
      >
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <a
            href="#home"
            className="text-xl font-semibold tracking-[0.25em] text-white"
          >
            Sahan
          </a>
          <ul className="flex flex-wrap gap-2 text-sm text-slate-300">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.id;

              return (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    className={`inline-flex rounded-full px-4 py-2 transition ${
                      isActive
                        ? "bg-white/10 text-[#4CE7FF]"
                        : "hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    {item.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </nav>
    </header>
  );
}
