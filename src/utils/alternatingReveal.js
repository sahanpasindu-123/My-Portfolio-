import { gsap } from "gsap";

const DEFAULT_HIDDEN_STATE = {
  autoAlpha: 0,
  scale: 0.985,
  x: 0,
  y: 14,
};

const DEFAULT_ENTER_STATE = {
  duration: 0.9,
  ease: "power3.out",
};

const normalizeElements = (elements) =>
  gsap.utils.toArray(elements).filter(Boolean);

const resolveGroupElements = (section, group) => {
  if (group.resolve) {
    return normalizeElements(group.resolve(section));
  }

  return normalizeElements(section.querySelectorAll(group.selector));
};

const resolveDirection = (sectionDirection, groupDirection = "inherit") => {
  if (groupDirection === "reverse") {
    return sectionDirection * -1;
  }

  if (groupDirection === "left") {
    return -1;
  }

  if (groupDirection === "right") {
    return 1;
  }

  return sectionDirection;
};

export const createRevealGroup = ({
  selector,
  resolve,
  direction = "inherit",
  distance = 60,
  hidden = {},
  enter = {},
  position,
}) => ({
  selector,
  resolve,
  direction,
  distance,
  hidden,
  enter,
  position,
});

export const getAlternatingDirection = (section, index) => {
  const manualDirection = section.dataset.animationDirection;

  if (manualDirection === "left") {
    return -1;
  }

  if (manualDirection === "right") {
    return 1;
  }

  return index % 2 === 0 ? -1 : 1;
};

export const hydrateRevealGroups = (section, sectionDirection, groups) =>
  groups
    .map((group) => ({
      ...group,
      elements: resolveGroupElements(section, group),
      direction: resolveDirection(sectionDirection, group.direction),
    }))
    .filter((group) => group.elements.length);

export const setRevealGroupsHidden = (groups) => {
  groups.forEach((group) => {
    gsap.set(group.elements, {
      ...DEFAULT_HIDDEN_STATE,
      ...group.hidden,
      x:
        group.hidden?.x ??
        group.direction * (group.distance ?? DEFAULT_HIDDEN_STATE.x),
      force3D: true,
    });
  });
};

export const setRevealGroupsVisible = (groups) => {
  groups.forEach((group) => {
    gsap.set(group.elements, {
      autoAlpha: 1,
      clearProps: "transform",
    });
  });
};

export const createRevealTimeline = (groups) => {
  const timeline = gsap.timeline({ paused: true });

  groups.forEach((group, index) => {
    const {
      duration = DEFAULT_ENTER_STATE.duration,
      ease = DEFAULT_ENTER_STATE.ease,
      stagger = 0,
      delay = 0,
      ...rest
    } = group.enter ?? {};

    timeline.to(
      group.elements,
      {
        autoAlpha: 1,
        x: 0,
        y: 0,
        scale: 1,
        duration,
        ease,
        stagger,
        delay,
        overwrite: "auto",
        force3D: true,
        clearProps: "transform",
        ...rest,
      },
      group.position ?? (index === 0 ? 0 : "<+0.08"),
    );
  });

  return timeline;
};
