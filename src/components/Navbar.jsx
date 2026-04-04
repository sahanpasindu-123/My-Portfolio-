import { useEffect, useState } from "react";

const NAV_ITEMS = [
  { id: "home", label: "Hero" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "contact", label: "Contact" },
];

function MenuIcon({ isOpen }) {
  return (
    <span className="relative block h-4 w-5">
      <span
        className={`absolute left-0 top-0 h-0.5 w-5 rounded-full bg-current transition duration-300 ${
          isOpen ? "translate-y-[0.44rem] rotate-45" : ""
        }`}
      />
      <span
        className={`absolute left-0 top-[0.44rem] h-0.5 w-5 rounded-full bg-current transition duration-300 ${
          isOpen ? "opacity-0" : ""
        }`}
      />
      <span
        className={`absolute left-0 top-[0.88rem] h-0.5 w-5 rounded-full bg-current transition duration-300 ${
          isOpen ? "-translate-y-[0.44rem] -rotate-45" : ""
        }`}
      />
    </span>
  );
}

export default function Navbar({ activeSection }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const closeOnDesktop = () => {
      if (window.innerWidth >= 768) {
        setIsMenuOpen(false);
      }
    };

    const closeOnEscape = (event) => {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
      }
    };

    closeOnDesktop();
    window.addEventListener("resize", closeOnDesktop);
    window.addEventListener("keydown", closeOnEscape);

    return () => {
      window.removeEventListener("resize", closeOnDesktop);
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen((currentValue) => !currentValue);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 px-4 pt-3 sm:px-6 sm:pt-4 lg:px-8">
      <nav
        data-navbar-shell
        data-menu-open={isMenuOpen ? "true" : "false"}
        className={`navbar-shell mx-auto max-w-6xl border border-white/10 px-4 py-3 transition-[border-radius,padding] sm:px-5 ${
          isMenuOpen ? "rounded-[1.85rem]" : "rounded-full"
        }`}
      >
        <div className="flex items-center justify-between gap-4">
          <a
            href="#home"
            className="text-lg font-semibold tracking-[0.12em] text-white transition hover:text-[#CFF8FF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4CE7FF]/50 sm:text-xl"
            onClick={closeMenu}
          >
            Sahan
          </a>

          <button
            type="button"
            aria-expanded={isMenuOpen}
            aria-controls="portfolio-mobile-nav"
            aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            className="mobile-nav-toggle inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/12 bg-white/[0.06] text-slate-100 transition hover:bg-white/[0.1] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4CE7FF]/50"
            onClick={toggleMenu}
          >
            <MenuIcon isOpen={isMenuOpen} />
          </button>

          <ul className="desktop-nav min-w-0 items-center gap-1 text-[0.95rem] text-slate-300 lg:gap-1.5">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.id;

              return (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    className={`inline-flex whitespace-nowrap rounded-full px-3.5 py-2 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4CE7FF]/50 lg:px-4 ${
                      isActive
                        ? "bg-white/12 text-[#9FEFFF] shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]"
                        : "hover:bg-white/[0.08] hover:text-white"
                    }`}
                  >
                    {item.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>

        <div
          id="portfolio-mobile-nav"
          className="mobile-nav-panel"
          data-open={isMenuOpen ? "true" : "false"}
        >
          <ul className="grid gap-2 pt-3 text-[0.95rem] text-slate-300">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.id;

              return (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    className={`flex w-full items-center rounded-[1.1rem] px-4 py-3 text-left transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4CE7FF]/50 ${
                      isActive
                        ? "bg-white/12 text-[#9FEFFF] shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]"
                        : "bg-white/[0.03] hover:bg-white/[0.08] hover:text-white"
                    }`}
                    onClick={closeMenu}
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
