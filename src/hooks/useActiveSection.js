import { useEffect, useState } from "react";

const getViewportHeight = () =>
  window.innerHeight || document.documentElement.clientHeight;

function resolveActiveSection(sections) {
  const viewportHeight = getViewportHeight();
  const focusLine = Math.min(280, Math.max(120, viewportHeight * 0.34));
  let closestSectionId = sections[0]?.id ?? "";
  let closestDistance = Number.POSITIVE_INFINITY;

  for (const section of sections) {
    const rect = section.getBoundingClientRect();

    if (rect.top <= focusLine && rect.bottom >= focusLine) {
      return section.id;
    }

    const distance = Math.min(
      Math.abs(rect.top - focusLine),
      Math.abs(rect.bottom - focusLine),
    );

    if (distance < closestDistance) {
      closestDistance = distance;
      closestSectionId = section.id;
    }
  }

  return closestSectionId;
}

export function useActiveSection(sectionIds) {
  const [activeSection, setActiveSection] = useState(sectionIds[0] ?? "");

  useEffect(() => {
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    if (!sections.length) {
      return undefined;
    }

    let frameId = 0;

    const updateActiveSection = () => {
      frameId = 0;
      const nextSection = resolveActiveSection(sections);

      setActiveSection((currentSection) =>
        currentSection === nextSection ? currentSection : nextSection,
      );
    };

    const scheduleUpdate = () => {
      if (frameId) {
        return;
      }

      frameId = window.requestAnimationFrame(updateActiveSection);
    };

    updateActiveSection();

    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);
    window.addEventListener("hashchange", scheduleUpdate);

    return () => {
      if (frameId) {
        window.cancelAnimationFrame(frameId);
      }

      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      window.removeEventListener("hashchange", scheduleUpdate);
    };
  }, [sectionIds]);

  return activeSection;
}
