import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function usePortfolioAnimations() {
  useEffect(() => {
    if (typeof window === "undefined") {
      return undefined;
    }

    gsap.registerPlugin(ScrollTrigger);

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const cleanup = [];
    const ctx = gsap.context(() => {
      const revealElements = gsap.utils.toArray("[data-reveal]");
      const parallaxElements = gsap.utils.toArray("[data-parallax]");
      const buttons = gsap.utils.toArray("[data-button-hover]");
      const heroSection = document.querySelector("[data-hero-section]");
      const heroItems = gsap.utils.toArray("[data-hero-item]");
      const heroCard = document.querySelector("[data-hero-card]");
      const aboutSection = document.querySelector("[data-about-section]");
      const aboutCopy = document.querySelector("[data-about-copy]");
      const aboutMedia = document.querySelector("[data-about-media]");
      const skillsSection = document.querySelector("[data-skills-section]");
      const skillCards = gsap.utils.toArray("[data-skill-card]");
      const experienceCards = gsap.utils.toArray("[data-experience-card]");
      const projectCards = gsap.utils.toArray("[data-project-card]");
      const contactSection = document.querySelector("[data-contact-section]");
      const contactItems = gsap.utils.toArray("[data-contact-item]");
      const navbar = document.querySelector("[data-navbar-shell]");
      const progressBar = document.querySelector("[data-scroll-progress]");

      ScrollTrigger.config({ ignoreMobileResize: true });

      const setVisible = (elements) => {
        if (!elements?.length) {
          return;
        }

        gsap.set(elements, {
          autoAlpha: 1,
          clearProps: "transform",
        });
      };

      const animateIn = (
        element,
        fromVars,
        toVars = {},
        {
          trigger = element,
          start = element?.dataset.start ?? "top 84%",
          delay = Number(element?.dataset.delay ?? 0),
        } = {},
      ) => {
        if (!element) {
          return;
        }

        gsap.fromTo(
          element,
          { autoAlpha: 0, ...fromVars },
          {
            autoAlpha: 1,
            delay,
            duration: 0.78,
            ease: "power3.out",
            clearProps: "transform",
            ...toVars,
            scrollTrigger: {
              trigger,
              start,
              once: true,
            },
          },
        );
      };

      if (prefersReducedMotion) {
        setVisible(revealElements);
        setVisible(heroItems);
        setVisible([heroCard, aboutCopy, aboutMedia, ...skillCards].filter(Boolean));
        setVisible(experienceCards);
        setVisible(projectCards);
        setVisible(contactItems);
        gsap.set(parallaxElements, { yPercent: 0 });
        gsap.set(progressBar, { scaleX: 1, transformOrigin: "left center" });

        skillCards.forEach((card) => {
          setVisible(gsap.utils.toArray(card.querySelectorAll("[data-skill-badge]")));
        });

        if (navbar) {
          navbar.classList.add("is-scrolled");
        }

        return;
      }

      revealElements.forEach((element) => {
        const delay = Number(element.dataset.delay ?? 0);

        gsap.fromTo(
          element,
          { autoAlpha: 0, y: 52 },
          {
            autoAlpha: 1,
            y: 0,
            delay,
            duration: 0.9,
            ease: "power3.out",
            clearProps: "transform",
            scrollTrigger: {
              trigger: element,
              start: "top 86%",
              once: true,
            },
          },
        );
      });

      if (heroSection) {
        const heroTimeline = gsap.timeline({
          scrollTrigger: {
            trigger: heroSection,
            start: "top 78%",
            once: true,
          },
        });

        if (heroItems.length) {
          heroTimeline.fromTo(
            heroItems,
            { autoAlpha: 0, y: 42 },
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.8,
              ease: "power3.out",
              stagger: 0.12,
              clearProps: "transform",
            },
            0,
          );
        }

        if (heroCard) {
          heroTimeline.fromTo(
            heroCard,
            { autoAlpha: 0, y: 34, scale: 0.98 },
            {
              autoAlpha: 1,
              y: 0,
              scale: 1,
              duration: 0.82,
              ease: "power3.out",
              clearProps: "transform",
            },
            0.16,
          );
        }
      }

      if (aboutSection) {
        animateIn(
          aboutMedia,
          { x: -56 },
          { duration: 0.82 },
          { trigger: aboutSection, start: "top 74%" },
        );
        animateIn(
          aboutCopy,
          { x: 56 },
          { duration: 0.82, delay: 0.12 },
          { trigger: aboutSection, start: "top 74%" },
        );
      }

      if (skillsSection) {
        skillCards.forEach((card, index) => {
          animateIn(
            card,
            { y: 42, scale: 0.97 },
            { duration: 0.72, delay: index * 0.06 },
            { trigger: card, start: "top 88%" },
          );

          const badges = gsap.utils.toArray(card.querySelectorAll("[data-skill-badge]"));

          if (!badges.length) {
            return;
          }

          gsap.fromTo(
            badges,
            { autoAlpha: 0, scale: 0.84, y: 18 },
            {
              autoAlpha: 1,
              scale: 1,
              y: 0,
              duration: 0.58,
              delay: 0.12,
              stagger: 0.06,
              ease: "power3.out",
              clearProps: "transform",
              scrollTrigger: {
                trigger: card,
                start: "top 88%",
                once: true,
              },
            },
          );
        });
      }

      experienceCards.forEach((card, index) => {
        animateIn(
          card,
          { y: 40 },
          { duration: 0.74, delay: index * 0.08 },
          { trigger: card, start: "top 86%" },
        );
      });

      projectCards.forEach((card, index) => {
        animateIn(
          card,
          { y: 46 },
          { duration: 0.8, delay: index * 0.08 },
          { trigger: card, start: "top 88%" },
        );
      });

      if (contactSection && contactItems.length) {
        gsap.fromTo(
          contactItems,
          { autoAlpha: 0, y: 26 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.68,
            stagger: 0.1,
            ease: "power3.out",
            clearProps: "transform",
            scrollTrigger: {
              trigger: contactSection,
              start: "top 80%",
              once: true,
            },
          },
        );
      }

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
