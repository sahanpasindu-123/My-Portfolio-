import { useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ENTER_TRIGGER = "top 78%";
const EXIT_TRIGGER = "bottom 24%";
const HIDDEN_STATE = {
  autoAlpha: 0,
  x: 0,
  y: 50,
  scale: 0.98,
};

const MOTION_TARGET_SELECTOR = [
  "[data-animated-section]",
  "[data-section-title-item]",
  "[data-hero-item]",
  "[data-hero-card]",
  "[data-about-copy]",
  "[data-about-media]",
  "[data-skill-card]",
  "[data-skill-badge]",
  "[data-experience-card]",
  "[data-project-aside]",
  "[data-project-card]",
  "[data-contact-panel]",
  "[data-contact-item]",
  "[data-reveal]",
].join(", ");

const createRootGroup = (section, overrides = {}) => ({
  resolve: () => [section],
  hidden: {
    y: 30,
    scale: 0.995,
    ...overrides.hidden,
  },
  enter: {
    duration: 0.72,
    ease: "power3.out",
    ...overrides.enter,
  },
  exit: {
    amount: 22,
    scale: 0.992,
    duration: 0.42,
    ease: "power2.inOut",
    ...overrides.exit,
  },
});

const createTitleGroup = (overrides = {}) => ({
  selector: "[data-section-title-item]",
  hidden: {
    y: 42,
    scale: 0.992,
    ...overrides.hidden,
  },
  enter: {
    duration: 0.78,
    ease: "power3.out",
    stagger: 0.1,
    ...overrides.enter,
  },
  exit: {
    amount: 26,
    scale: 0.992,
    duration: 0.4,
    ease: "power2.inOut",
    stagger: 0.03,
    ...overrides.exit,
  },
});

const SECTION_PROFILES = {
  default: (section) => [createRootGroup(section), createTitleGroup()],
  home: (section) => [
    createRootGroup(section, {
      hidden: { y: 24, scale: 0.996 },
      enter: { duration: 0.82 },
      exit: { amount: 20, duration: 0.38, scale: 0.994 },
    }),
    {
      selector: "[data-hero-item]",
      hidden: { y: 52, scale: 0.992 },
      enter: {
        duration: 0.86,
        ease: "power3.out",
        stagger: 0.12,
      },
      exit: {
        amount: 36,
        scale: 0.986,
        duration: 0.48,
        ease: "power2.inOut",
        stagger: 0.04,
      },
    },
    {
      selector: "[data-hero-card]",
      hidden: { y: 40, scale: 0.972 },
      enter: {
        duration: 0.88,
        ease: "power3.out",
        delay: 0.16,
      },
      exit: {
        amount: 34,
        scale: 0.974,
        duration: 0.5,
        ease: "power2.inOut",
      },
    },
  ],
  about: (section) => [
    createRootGroup(section),
    {
      selector: "[data-about-media]",
      hidden: { x: -56, y: 0, scale: 0.978 },
      enter: {
        duration: 0.84,
        ease: "power3.out",
      },
      exit: {
        amount: 28,
        scale: 0.986,
        duration: 0.46,
        ease: "power2.inOut",
      },
    },
    {
      selector: "[data-about-copy]",
      hidden: { x: 56, y: 0, scale: 0.992 },
      enter: {
        duration: 0.84,
        ease: "power3.out",
        delay: 0.1,
      },
      exit: {
        amount: 30,
        scale: 0.988,
        duration: 0.48,
        ease: "power2.inOut",
      },
    },
  ],
  skills: (section) => [
    createRootGroup(section),
    createTitleGroup(),
    {
      selector: "[data-skill-card]",
      hidden: { y: 44, scale: 0.972 },
      enter: {
        duration: 0.82,
        ease: "power3.out",
        stagger: 0.08,
        delay: 0.08,
      },
      exit: {
        amount: 34,
        scale: 0.964,
        duration: 0.48,
        ease: "power2.inOut",
        stagger: 0.04,
      },
    },
    {
      selector: "[data-skill-badge]",
      hidden: { y: 18, scale: 0.84 },
      enter: {
        duration: 0.58,
        ease: "power3.out",
        stagger: 0.035,
        delay: 0.18,
      },
      exit: {
        amount: 18,
        scale: 0.92,
        duration: 0.34,
        ease: "power2.inOut",
        stagger: 0.012,
      },
    },
  ],
  experience: (section) => [
    createRootGroup(section),
    createTitleGroup(),
    {
      selector: "[data-experience-card]",
      hidden: { y: 40, scale: 0.984 },
      enter: {
        duration: 0.76,
        ease: "power3.out",
        stagger: 0.08,
        delay: 0.08,
      },
      exit: {
        amount: 30,
        scale: 0.978,
        duration: 0.42,
        ease: "power2.inOut",
        stagger: 0.02,
      },
    },
  ],
  projects: (section) => [
    createRootGroup(section, {
      hidden: { y: 28, scale: 0.994 },
      enter: { duration: 0.76 },
    }),
    createTitleGroup(),
    {
      selector: "[data-project-aside]",
      hidden: { y: 32, scale: 0.988 },
      enter: {
        duration: 0.72,
        ease: "power3.out",
        delay: 0.1,
      },
      exit: {
        amount: 24,
        scale: 0.984,
        duration: 0.4,
        ease: "power2.inOut",
      },
    },
    {
      selector: "[data-project-card]",
      hidden: { y: 48, scale: 0.972 },
      enter: {
        duration: 0.82,
        ease: "power3.out",
        stagger: 0.08,
        delay: 0.08,
      },
      exit: {
        amount: 34,
        scale: 0.968,
        duration: 0.46,
        ease: "power2.inOut",
        stagger: 0.04,
      },
    },
  ],
  contact: (section) => [
    createRootGroup(section),
    createTitleGroup(),
    {
      selector: "[data-contact-panel]",
      hidden: { y: 34, scale: 0.982 },
      enter: {
        duration: 0.76,
        ease: "power3.out",
        delay: 0.08,
      },
      exit: {
        amount: 26,
        scale: 0.978,
        duration: 0.42,
        ease: "power2.inOut",
      },
    },
    {
      selector: "[data-contact-item]",
      hidden: { y: 24, scale: 0.988 },
      enter: {
        duration: 0.62,
        ease: "power3.out",
        stagger: 0.1,
        delay: 0.14,
      },
      exit: {
        amount: 20,
        scale: 0.972,
        duration: 0.34,
        ease: "power2.inOut",
        stagger: 0.03,
      },
    },
  ],
};

const normalizeElements = (elements) =>
  gsap.utils.toArray(elements).filter(Boolean);

const resolveGroupElements = (section, group) => {
  if (group.resolve) {
    return normalizeElements(group.resolve(section));
  }

  return normalizeElements(section.querySelectorAll(group.selector));
};

const getProfileGroups = (section) => {
  const profileName = section.dataset.animationProfile ?? "default";
  const profileFactory = SECTION_PROFILES[profileName] ?? SECTION_PROFILES.default;

  return profileFactory(section)
    .map((group) => ({
      ...group,
      elements: resolveGroupElements(section, group),
    }))
    .filter((group) => group.elements.length);
};

const getExitY = (group, direction) => {
  const amount = group.exit?.amount ?? 40;

  return direction < 0 ? amount : -amount;
};

const setGroupState = (group, state, direction = 1) => {
  if (!group.elements.length) {
    return;
  }

  if (state === "visible") {
    gsap.set(group.elements, {
      autoAlpha: 1,
      clearProps: "transform",
    });

    return;
  }

  if (state === "exit") {
    gsap.set(group.elements, {
      autoAlpha: 0,
      x: 0,
      y: getExitY(group, direction),
      scale: group.exit?.scale ?? 0.98,
      force3D: true,
    });

    return;
  }

  gsap.set(group.elements, {
    ...HIDDEN_STATE,
    ...group.hidden,
    force3D: true,
  });
};

const animateGroupState = (group, state, direction = 1) => {
  if (!group.elements.length) {
    return;
  }

  gsap.killTweensOf(group.elements);

  if (state === "visible") {
    const { duration = 0.82, ease = "power3.out", delay = 0, stagger = 0 } =
      group.enter ?? {};

    gsap.to(group.elements, {
      autoAlpha: 1,
      x: 0,
      y: 0,
      scale: 1,
      duration,
      ease,
      delay,
      stagger,
      overwrite: "auto",
      force3D: true,
      clearProps: "transform",
    });

    return;
  }

  const { duration = 0.48, ease = "power2.inOut", delay = 0, stagger = 0 } =
    group.exit ?? {};

  gsap.to(group.elements, {
    autoAlpha: 0,
    x: 0,
    y: getExitY(group, direction),
    scale: group.exit?.scale ?? 0.98,
    duration,
    ease,
    delay,
    stagger,
    overwrite: "auto",
    force3D: true,
  });
};

const syncSectionState = (section, groups) => {
  const rect = section.getBoundingClientRect();
  const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
  const enterThreshold = viewportHeight * 0.78;
  const exitThreshold = viewportHeight * 0.24;
  const isInitialHero = section.id === "home" && window.scrollY < 4;
  const isVisible = rect.top <= enterThreshold && rect.bottom >= exitThreshold;
  const isPastSection = rect.bottom < exitThreshold;

  if (isPastSection) {
    groups.forEach((group) => setGroupState(group, "exit", 1));
    return;
  }

  if (isVisible) {
    if (isInitialHero) {
      requestAnimationFrame(() => {
        groups.forEach((group) => animateGroupState(group, "visible"));
      });
      return;
    }

    groups.forEach((group) => setGroupState(group, "visible"));
    return;
  }

  groups.forEach((group) => setGroupState(group, "hidden"));

  if (isInitialHero) {
    requestAnimationFrame(() => {
      groups.forEach((group) => animateGroupState(group, "visible"));
    });
  }
};

const setVisible = (elements) => {
  if (!elements.length) {
    return;
  }

  gsap.set(elements, {
    autoAlpha: 1,
    clearProps: "transform",
  });
};

export function usePortfolioAnimations() {
  useLayoutEffect(() => {
    if (typeof window === "undefined") {
      return undefined;
    }

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const cleanup = [];
    const ctx = gsap.context(() => {
      const revealElements = normalizeElements(document.querySelectorAll("[data-reveal]"));
      const parallaxElements = normalizeElements(document.querySelectorAll("[data-parallax]"));
      const buttons = normalizeElements(document.querySelectorAll("[data-button-hover]"));
      const animatedSections = normalizeElements(
        document.querySelectorAll("[data-animated-section]"),
      );
      const navbar = document.querySelector("[data-navbar-shell]");
      const progressBar = document.querySelector("[data-scroll-progress]");
      const motionTargets = normalizeElements(
        document.querySelectorAll(MOTION_TARGET_SELECTOR),
      );

      ScrollTrigger.config({ ignoreMobileResize: true });

      if (prefersReducedMotion) {
        setVisible(motionTargets);
        gsap.set(parallaxElements, { yPercent: 0, clearProps: "transform" });
        gsap.set(progressBar, { scaleX: 1, transformOrigin: "left center" });

        if (navbar) {
          navbar.classList.toggle("is-scrolled", window.scrollY > 24);
        }

        return;
      }

      animatedSections.forEach((section) => {
        const groups = getProfileGroups(section);

        groups.forEach((group) => setGroupState(group, "hidden"));

        const trigger = ScrollTrigger.create({
          trigger: section,
          start: ENTER_TRIGGER,
          end: EXIT_TRIGGER,
          invalidateOnRefresh: true,
          onEnter: () => {
            groups.forEach((group) => animateGroupState(group, "visible"));
          },
          onLeave: () => {
            groups.forEach((group) => animateGroupState(group, "exit", 1));
          },
          onEnterBack: () => {
            groups.forEach((group) => animateGroupState(group, "visible"));
          },
          onLeaveBack: () => {
            groups.forEach((group) => animateGroupState(group, "exit", -1));
          },
        });

        syncSectionState(section, groups);
      });

      revealElements
        .filter((element) => !element.closest("[data-animated-section]"))
        .forEach((element) => {
          const delay = Number(element.dataset.delay ?? 0);

          gsap.set(element, {
            autoAlpha: 0,
            y: 40,
            force3D: true,
          });

          gsap.to(element, {
            autoAlpha: 1,
            y: 0,
            delay,
            duration: 0.78,
            ease: "power3.out",
            clearProps: "transform",
            scrollTrigger: {
              trigger: element,
              start: "top 86%",
              once: true,
            },
          });
        });

      parallaxElements.forEach((element) => {
        const speed = Number(element.dataset.speed ?? 0.14);
        const trigger = element.closest("[data-section]") ?? element;

        gsap.to(element, {
          yPercent: speed * -100,
          ease: "none",
          force3D: true,
          scrollTrigger: {
            trigger,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.2,
          },
        });
      });

      if (progressBar) {
        gsap.set(progressBar, {
          scaleX: 0,
          transformOrigin: "left center",
        });

        gsap.to(progressBar, {
          scaleX: 1,
          ease: "none",
          scrollTrigger: {
            trigger: document.documentElement,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.18,
          },
        });
      }

      if (navbar) {
        ScrollTrigger.create({
          trigger: document.documentElement,
          start: "top top",
          end: "bottom bottom",
          onUpdate: (self) => {
            navbar.classList.toggle("is-scrolled", self.scroll() > 24);
          },
        });
      }

      buttons.forEach((button) => {
        const xTo = gsap.quickTo(button, "x", {
          duration: 0.35,
          ease: "power3.out",
        });
        const yTo = gsap.quickTo(button, "y", {
          duration: 0.35,
          ease: "power3.out",
        });

        const handleEnter = () => {
          gsap.to(button, {
            scale: 1.02,
            duration: 0.3,
            ease: "power3.out",
          });
        };

        const handleMove = (event) => {
          const bounds = button.getBoundingClientRect();
          const x = ((event.clientX - bounds.left) / bounds.width - 0.5) * 14;
          const y = ((event.clientY - bounds.top) / bounds.height - 0.5) * 10;

          xTo(x);
          yTo(y);
        };

        const handleLeave = () => {
          xTo(0);
          yTo(0);
          gsap.to(button, {
            scale: 1,
            duration: 0.35,
            ease: "power3.out",
          });
        };

        button.addEventListener("mouseenter", handleEnter);
        button.addEventListener("mousemove", handleMove);
        button.addEventListener("mouseleave", handleLeave);

        cleanup.push(() => {
          button.removeEventListener("mouseenter", handleEnter);
          button.removeEventListener("mousemove", handleMove);
          button.removeEventListener("mouseleave", handleLeave);
        });
      });
    });

    ScrollTrigger.refresh();

    return () => {
      cleanup.forEach((fn) => fn());
      ctx.revert();
    };
  }, []);
}
