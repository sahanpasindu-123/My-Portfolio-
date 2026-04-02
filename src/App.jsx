import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import ScrollProgressBar from "./components/ScrollProgressBar";
import CinematicPortfolio from "./cinematic/CinematicPortfolio";
import { usePortfolioAnimations } from "./hooks/usePortfolioAnimations";
import AboutSection from "./sections/AboutSection";
import ContactSection from "./sections/ContactSection";
import ExperienceSection from "./sections/ExperienceSection";
import HomeSection from "./sections/HomeSection";
import ProjectsSection from "./sections/ProjectsSection";
import SkillsSection from "./sections/SkillsSection";

export default function App() {
  usePortfolioAnimations();

  return (
    <div className="portfolio-app">
      <CinematicPortfolio />

      <div className="portfolio-content">
        <div className="portfolio-shell relative min-h-screen overflow-x-hidden bg-transparent text-slate-100">
          <ScrollProgressBar />
          <div
            data-parallax
            data-speed="0.08"
            className="pointer-events-none absolute left-[-8rem] top-[-6rem] -z-10 h-[28rem] w-[28rem] rounded-full bg-[#9A6EF5]/20 blur-3xl"
          />
          <div
            data-parallax
            data-speed="0.12"
            className="pointer-events-none absolute right-[-6rem] top-12 -z-10 h-[24rem] w-[24rem] rounded-full bg-[#4CE7FF]/14 blur-3xl"
          />
          <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[36rem] bg-[radial-gradient(circle_at_top_left,rgba(154,110,245,0.18),transparent_26%),radial-gradient(circle_at_80%_18%,rgba(76,231,255,0.14),transparent_20%)]" />
          <Navbar />
          <main className="portfolio-main mx-auto flex max-w-6xl flex-col gap-24 px-4 pb-24 pt-8 sm:px-6 lg:px-8">
            <HomeSection />
            <AboutSection />
            <SkillsSection />
            <ExperienceSection />
            <ProjectsSection />
            <ContactSection />
          </main>
          <Footer />
        </div>
      </div>
    </div>
  );
}
