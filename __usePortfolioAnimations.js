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
      const navbar = document.querySelector("[data-navbar-shell]");
      const progressBar = document.querySelector("[data-scroll-progress]");

      ScrollTrigger.config({ ignoreMobileResize: true });

      if (prefersReducedMotion) {
        gsap.set(revealElements, { autoAlpha: 1, y: 0 });
        gsap.set(parallaxElements, { yPercent: 0 });
        gsap.set(progressBar, { scaleX: 1, transformOrigin: "left center" });

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
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);
}
