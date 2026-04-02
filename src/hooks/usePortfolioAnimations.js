import { useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  createRevealGroup,
  createRevealTimeline,
  getAlternatingDirection,
  hydrateRevealGroups,
  setRevealGroupsHidden,
  setRevealGroupsVisible,
} from "../utils/alternatingReveal";

gsap.registerPlugin(ScrollTrigger);

const ENTER_TRIGGER = "top 82%";
const INITIAL_VISIBILITY_RATIO = 0.18;
const DEFAULT_CINEMATIC_SYNC = {
  progress: 0,
  driftX: 0,
  driftY: 0,
  depth: 0,
  calm: 0,
};

const PARALLAX_SPEEDS = {
  slow: {
    name: "slow",
    yTravel: 24,
    xTravel: 8,
    scaleDelta: 0.02,
    sceneX: 4,
    sceneY: 3.6,
    sceneDepth: 0.0032,
    opacityFloor: 0.9,
    opacityBoost: 0.05,
    scrub: 1.55,
    mouse: null,
  },
  medium: {
    name: "medium",
    yTravel: 46,
    xTravel: 12,
    scaleDelta: 0.028,
    sceneX: 6,
    sceneY: 4.8,
    sceneDepth: 0.0044,
    opacityFloor: 0.94,
    opacityBoost: 0.04,
    scrub: 1.24,
    mouse: null,
  },
  fast: {
    name: "fast",
    yTravel: 72,
    xTravel: 18,
    scaleDelta: 0.038,
    sceneX: 8.5,
    sceneY: 6,
    sceneDepth: 0.0056,
    opacityFloor: 0.96,
    opacityBoost: 0.03,
    scrub: 1.08,
    mouse: {
      x: 8,
      y: 6,
    },
  },
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

const createRootGroup = (section, overrides = {}) =>
  createRevealGroup({
    resolve: () => [section],
    distance: 26,
    hidden: {
      y: 10,
      scale: 0.997,
    },
    enter: {
      duration: 0.8,
      ease: "power3.out",
    },
    position: 0,
    ...overrides,
  });

const createTitleGroup = (overrides = {}) =>
  createRevealGroup({
    selector: "[data-section-title-item]",
    distance: 52,
    hidden: {
      y: 10,
      scale: 0.992,
    },
    enter: {
      duration: 0.9,
      ease: "power3.out",
      stagger: 0.08,
    },
    position: 0.08,
    ...overrides,
  });

const SECTION_PROFILES = {
  default: (section) => [createRootGroup(section), createTitleGroup()],
  home: (section) => [
    createRootGroup(section, {
      distance: 22,
      hidden: { y: 8, scale: 0.998 },
      enter: { duration: 0.78, ease: "power3.out" },
    }),
    createRevealGroup({
      selector: "[data-hero-item]",
      distance: 78,
      hidden: { y: 10, scale: 0.992 },
      enter: {
        duration: 0.98,
        ease: "power3.out",
        stagger: 0.1,
      },
      position: 0.08,
    }),
    createRevealGroup({
      selector: "[data-hero-card]",
      distance: 88,
      hidden: { y: 8, scale: 0.986 },
      enter: {
        duration: 1.04,
        ease: "power3.out",
      },
      position: 0.2,
    }),
  ],
  about: (section) => [
    createRootGroup(section),
    createRevealGroup({
      selector: "[data-about-copy]",
      distance: 70,
      hidden: { y: 8, scale: 0.992 },
      enter: {
        duration: 0.94,
        ease: "power3.out",
      },
      position: 0.1,
    }),
    createRevealGroup({
      selector: "[data-about-media]",
      distance: 82,
      hidden: { y: 10, scale: 0.986 },
      enter: {
        duration: 1,
        ease: "power3.out",
      },
      position: 0.18,
    }),
  ],
  skills: (section) => [
    createRootGroup(section),
    createTitleGroup(),
    createRevealGroup({
      selector: "[data-skill-card]",
      distance: 66,
      hidden: { y: 10, scale: 0.984 },
      enter: {
        duration: 0.94,
        ease: "power3.out",
        stagger: 0.09,
      },
      position: 0.18,
    }),
    createRevealGroup({
      selector: "[data-skill-badge]",
      distance: 22,
      hidden: { y: 8, scale: 0.97 },
      enter: {
        duration: 0.6,
        ease: "power3.out",
        stagger: 0.025,
      },
      position: 0.3,
    }),
  ],
  experience: (section) => [
    createRootGroup(section),
    createTitleGroup(),
    createRevealGroup({
      selector: "[data-experience-card]",
      distance: 62,
      hidden: { y: 10, scale: 0.986 },
      enter: {
        duration: 0.92,
        ease: "power3.out",
        stagger: 0.08,
      },
      position: 0.18,
    }),
  ],
  projects: (section) => [
    createRootGroup(section, {
      distance: 24,
      hidden: { y: 10, scale: 0.996 },
      enter: { duration: 0.82, ease: "power3.out" },
    }),
    createTitleGroup(),
    createRevealGroup({
      selector: "[data-project-aside]",
      distance: 46,
      hidden: { y: 8, scale: 0.99 },
      enter: {
        duration: 0.84,
        ease: "power3.out",
      },
      position: 0.16,
    }),
    createRevealGroup({
      selector: "[data-project-card]",
      distance: 70,
      hidden: { y: 10, scale: 0.984 },
      enter: {
        duration: 0.96,
        ease: "power3.out",
        stagger: 0.09,
      },
      position: 0.24,
    }),
  ],
  contact: (section) => [
    createRootGroup(section),
    createTitleGroup(),
    createRevealGroup({
      selector: "[data-contact-panel]",
      distance: 64,
      hidden: { y: 10, scale: 0.986 },
      enter: {
        duration: 0.92,
        ease: "power3.out",
      },
      position: 0.16,
    }),
    createRevealGroup({
      selector: "[data-contact-item]",
      distance: 24,
      hidden: { y: 8, scale: 0.978 },
      enter: {
        duration: 0.66,
        ease: "power3.out",
        stagger: 0.08,
      },
      position: 0.28,
    }),
  ],
};

const normalizeElements = (elements) =>
  gsap.utils.toArray(elements).filter(Boolean);

const clamp01 = gsap.utils.clamp(0, 1);

const readCinematicSync = () => {
  if (typeof window === "undefined") {
    return DEFAULT_CINEMATIC_SYNC;
  }

  return window.__portfolioCinematicState ?? DEFAULT_CINEMATIC_SYNC;
};

const getNumericParallaxProfile = (value) => {
  const magnitude = Math.max(Math.abs(value), 0.04);
  const yTravel = gsap.utils.clamp(28, 112, magnitude * 420);
  const intensity = gsap.utils.mapRange(28, 112, 0, 1, yTravel);

  return {
    name: "custom",
    yTravel,
    xTravel: gsap.utils.interpolate(8, 26, intensity),
    scaleDelta: gsap.utils.interpolate(0.022, 0.05, intensity),
    sceneX: gsap.utils.interpolate(5, 13, intensity),
    sceneY: gsap.utils.interpolate(4, 9, intensity),
    sceneDepth: gsap.utils.interpolate(0.0035, 0.0075, intensity),
    opacityFloor: gsap.utils.interpolate(0.76, 0.94, intensity),
    opacityBoost: gsap.utils.interpolate(0.12, 0.06, intensity),
    scrub: gsap.utils.interpolate(1.28, 0.95, intensity),
    mouse:
      yTravel >= PARALLAX_SPEEDS.fast.yTravel * 0.85
        ? PARALLAX_SPEEDS.fast.mouse
        : null,
  };
};

const getParallaxProfile = (element, index) => {
  const rawSpeed = element.dataset.speed?.trim().toLowerCase();
  const numericSpeed = Number(rawSpeed);
  const profile =
    rawSpeed && Number.isFinite(numericSpeed)
      ? getNumericParallaxProfile(numericSpeed)
      : PARALLAX_SPEEDS[rawSpeed] ?? PARALLAX_SPEEDS.medium;

  const horizontalDirection =
    element.dataset.parallaxX === "right"
      ? 1
      : element.dataset.parallaxX === "left"
        ? -1
        : index % 2 === 0
          ? 1
          : -1;
  const verticalDirection = element.dataset.parallaxY === "reverse" ? -1 : 1;

  return {
    ...profile,
    horizontalDirection,
    verticalDirection,
    mouseEnabled:
      element.hasAttribute("data-mouse-parallax") && Boolean(profile.mouse),
  };
};

const getInitialParallaxProgress = (trigger) => {
  const rect = trigger.getBoundingClientRect();
  const viewportHeight =
    window.innerHeight || document.documentElement.clientHeight;
  const totalDistance = viewportHeight + rect.height;
  const travelledDistance = viewportHeight - rect.top;

  if (totalDistance <= 0) {
    return 0.5;
  }

  return clamp01(travelledDistance / totalDistance);
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

const getInitialSectionState = (section) => {
  const rect = section.getBoundingClientRect();
  const viewportHeight =
    window.innerHeight || document.documentElement.clientHeight;
  const triggerLine = viewportHeight * 0.82;
  const visibilityLine = viewportHeight * INITIAL_VISIBILITY_RATIO;

  if (rect.bottom <= 0) {
    return "visible";
  }

  if (rect.top <= triggerLine && rect.bottom >= visibilityLine) {
    return "play";
  }

  return "hidden";
};

const getProfileGroups = (section, sectionIndex) => {
  const profileName = section.dataset.animationProfile ?? "default";
  const profileFactory = SECTION_PROFILES[profileName] ?? SECTION_PROFILES.default;
  const sectionDirection = getAlternatingDirection(section, sectionIndex);

  section.dataset.resolvedAnimationDirection =
    sectionDirection < 0 ? "left" : "right";

  return hydrateRevealGroups(section, sectionDirection, profileFactory(section));
};

const getStandaloneRevealDirection = (element) => {
  const manualDirection = element.dataset.revealDirection;

  if (manualDirection === "right") {
    return 1;
  }

  if (manualDirection === "left") {
    return -1;
  }

  const parentSection = element.closest("[data-animated-section]");

  if (parentSection?.dataset.resolvedAnimationDirection === "right") {
    return 1;
  }

  return -1;
};

export function usePortfolioAnimations() {
  useLayoutEffect(() => {
    if (typeof window === "undefined") {
      return undefined;
    }

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const hasFinePointer = window.matchMedia("(pointer: fine)").matches;

    const cleanup = [];
    const ctx = gsap.context(() => {
      const revealElements = normalizeElements(
        document.querySelectorAll("[data-reveal]"),
      );
      const parallaxElements = normalizeElements(
        document.querySelectorAll("[data-parallax]"),
      );
      const buttons = normalizeElements(
        document.querySelectorAll("[data-button-hover]"),
      );
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
        gsap.set(parallaxElements, {
          x: 0,
          y: 0,
          scale: 1,
          opacity: 1,
          clearProps: "transform,opacity",
        });
        gsap.set(progressBar, { scaleX: 1, transformOrigin: "left center" });

        if (navbar) {
          navbar.classList.toggle("is-scrolled", window.scrollY > 24);
        }

        return;
      }

      animatedSections.forEach((section, sectionIndex) => {
        const groups = getProfileGroups(section, sectionIndex);

        if (!groups.length) {
          return;
        }

        setRevealGroupsHidden(groups);

        const initialState = getInitialSectionState(section);

        if (initialState === "visible") {
          setRevealGroupsVisible(groups);
          return;
        }

        const timeline = createRevealTimeline(groups);
        cleanup.push(() => timeline.kill());

        if (initialState === "play") {
          timeline.play(0);
          return;
        }

        const trigger = ScrollTrigger.create({
          trigger: section,
          start: ENTER_TRIGGER,
          once: true,
          fastScrollEnd: true,
          invalidateOnRefresh: true,
          preventOverlaps: "portfolio-section-reveal",
          onEnter: () => {
            timeline.play(0);
          },
        });

        cleanup.push(() => trigger.kill());
      });

      revealElements
        .filter((element) => !element.closest("[data-animated-section]"))
        .forEach((element) => {
          const delay = Number(element.dataset.delay ?? 0);
          const direction = getStandaloneRevealDirection(element);

          gsap.set(element, {
            autoAlpha: 0,
            x: direction * 44,
            y: 10,
            force3D: true,
          });

          const animation = gsap.to(element, {
            autoAlpha: 1,
            x: 0,
            y: 0,
            delay,
            duration: 0.84,
            ease: "power3.out",
            clearProps: "transform",
            scrollTrigger: {
              trigger: element,
              start: "top 86%",
              once: true,
              fastScrollEnd: true,
            },
          });

          cleanup.push(() => animation.kill());
        });

      parallaxElements.forEach((element, index) => {
        const profile = getParallaxProfile(element, index);
        const trigger =
          element.closest("[data-parallax-scope]") ??
          element.closest("[data-section]") ??
          element.closest("[data-animated-section]") ??
          element;
        const initialProgress = getInitialParallaxProgress(trigger);
        const state = {
          progress: initialProgress,
          mouseX: 0,
          mouseY: 0,
        };
        const setX = gsap.quickSetter(element, "x", "px");
        const setY = gsap.quickSetter(element, "y", "px");
        const setScale = gsap.quickSetter(element, "scale");
        const setOpacity = gsap.quickSetter(element, "opacity");

        gsap.set(element, {
          force3D: true,
          transformOrigin: "center center",
        });

        const render = () => {
          const centeredProgress = state.progress - 0.5;
          const focus = clamp01(1 - Math.abs(centeredProgress) * 2);
          const cinematicSync = readCinematicSync();
          const isAtmosphere = element.classList.contains("parallax-atmosphere");
          const sectionState = element.closest("[data-focus-state]")?.dataset.focusState;
          const isActiveSection = sectionState === "active";
          const calmDamping = 1 - cinematicSync.calm * 0.22;
          const motionFactor = (isAtmosphere ? 0.68 : 0.44) * calmDamping;
          const sceneFactor = isAtmosphere ? 0.78 : 0.46;
          const scaleFactor = isAtmosphere ? 0.72 : 0.38;
          const atmosphereOpacity = gsap.utils.clamp(
            0.16,
            0.44,
            (profile.opacityFloor + focus * profile.opacityBoost) *
              0.42 *
              (isActiveSection ? 0.9 : 1),
          );
          const contentOpacity = gsap.utils.clamp(0.95, 1, 0.95 + focus * 0.05);
          const x =
            centeredProgress * profile.xTravel * profile.horizontalDirection * motionFactor +
            cinematicSync.driftX * profile.sceneX * sceneFactor +
            state.mouseX * (isAtmosphere ? 0.15 : 1);
          const y =
            centeredProgress * profile.yTravel * profile.verticalDirection * motionFactor +
            cinematicSync.driftY * profile.sceneY * sceneFactor +
            state.mouseY * (isAtmosphere ? 0.15 : 1);
          const scale =
            1 -
            (1 - focus) * profile.scaleDelta * scaleFactor +
            cinematicSync.depth * profile.sceneDepth * sceneFactor;
          const opacity = isAtmosphere ? atmosphereOpacity : contentOpacity;

          setX(x);
          setY(y);
          setScale(scale);
          setOpacity(opacity);
        };

        const progressState = { value: initialProgress };
        const tween = gsap.to(progressState, {
          value: 1,
          ease: "none",
          onUpdate: () => {
            state.progress = progressState.value;
            render();
          },
          scrollTrigger: {
            trigger,
            start: "top bottom",
            end: "bottom top",
            scrub: profile.scrub,
            invalidateOnRefresh: true,
            onRefresh: () => {
              state.progress = getInitialParallaxProgress(trigger);
              render();
            },
          },
        });

        cleanup.push(() => tween.kill());

        if (hasFinePointer && profile.mouseEnabled && profile.mouse) {
          const mouseXTo = gsap.quickTo(state, "mouseX", {
            duration: 0.6,
            ease: "power3.out",
            onUpdate: render,
          });
          const mouseYTo = gsap.quickTo(state, "mouseY", {
            duration: 0.6,
            ease: "power3.out",
            onUpdate: render,
          });

          const handlePointerMove = (event) => {
            const bounds = element.getBoundingClientRect();

            if (!bounds.width || !bounds.height) {
              return;
            }

            const x = ((event.clientX - bounds.left) / bounds.width - 0.5) *
              profile.mouse.x;
            const y = ((event.clientY - bounds.top) / bounds.height - 0.5) *
              profile.mouse.y;

            mouseXTo(x);
            mouseYTo(y);
          };

          const handlePointerLeave = () => {
            mouseXTo(0);
            mouseYTo(0);
          };

          element.addEventListener("pointermove", handlePointerMove);
          element.addEventListener("pointerleave", handlePointerLeave);

          cleanup.push(() => {
            element.removeEventListener("pointermove", handlePointerMove);
            element.removeEventListener("pointerleave", handlePointerLeave);
          });
        }

        render();
      });

      if (progressBar) {
        gsap.set(progressBar, {
          scaleX: 0,
          transformOrigin: "left center",
        });

        const tween = gsap.to(progressBar, {
          scaleX: 1,
          ease: "none",
          scrollTrigger: {
            trigger: document.documentElement,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.18,
          },
        });

        cleanup.push(() => tween.kill());
      }

      if (navbar) {
        const trigger = ScrollTrigger.create({
          trigger: document.documentElement,
          start: "top top",
          end: "bottom bottom",
          onUpdate: (self) => {
            navbar.classList.toggle("is-scrolled", self.scroll() > 24);
          },
        });

        cleanup.push(() => trigger.kill());
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
