import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger);

export class ScrollController {
  constructor({ scrollTrack, cameraController, sceneWorld }) {
    this.scrollTrack = scrollTrack;
    this.cameraController = cameraController;
    this.sceneWorld = sceneWorld;

    this.createLenis();
    this.createTimeline();

    window.requestAnimationFrame(() => {
      ScrollTrigger.refresh();
    });
  }

  syncDomParallax(progress) {
    if (typeof window === "undefined" || typeof document === "undefined") {
      return;
    }

    const cameraState = this.cameraController.state;
    const driftX = gsap.utils.clamp(-1, 1, cameraState.x / 6.8);
    const driftY = gsap.utils.clamp(-1, 1, (cameraState.y - 0.45) / 2.4);
    const depth = gsap.utils.clamp(0, 1, progress);
    const calm = gsap.utils.clamp(0, 1, cameraState.calm ?? 0);
    const root = document.documentElement;
    const syncState = {
      progress,
      driftX,
      driftY,
      depth,
      calm,
    };

    window.__portfolioCinematicState = syncState;

    root.style.setProperty("--cinema-progress", progress.toFixed(4));
    root.style.setProperty("--cinema-drift-x", driftX.toFixed(4));
    root.style.setProperty("--cinema-drift-y", driftY.toFixed(4));
    root.style.setProperty("--cinema-depth", depth.toFixed(4));
    root.style.setProperty("--cinema-calm", calm.toFixed(4));
  }

  createLenis() {
    this.lenis = new Lenis({
      autoRaf: false,
      duration: 1.2,
      lerp: 0.11,
      smoothWheel: true,
      smoothTouch: false,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.05,
    });

    this.handleLenisScroll = () => {
      ScrollTrigger.update();
    };

    this.handleGsapTick = (time) => {
      this.lenis?.raf(time * 1000);
    };

    this.handleRefresh = () => {
      this.lenis?.resize();
    };

    this.lenis.on("scroll", this.handleLenisScroll);
    gsap.ticker.add(this.handleGsapTick);
    gsap.ticker.lagSmoothing(0);
    ScrollTrigger.addEventListener("refresh", this.handleRefresh);
  }

  createTimeline() {
    const cameraState = this.cameraController.state;
    const sceneState = this.sceneWorld.state;

    this.syncDomParallax(0);

    // One scrubbed timeline drives the full camera journey and scene-state transitions.
    this.timeline = gsap.timeline({
      defaults: { ease: "none" },
      scrollTrigger: {
        trigger: this.scrollTrack,
        start: "top top",
        end: "bottom bottom",
        scrub: 1.2,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          sceneState.masterProgress = self.progress;
          this.syncDomParallax(self.progress);
        },
      },
    });

    this.timeline
      .addLabel("intro", 0)
      .to(
        cameraState,
        {
          z: 18,
          y: 0.8,
          targetZ: 0,
          fov: 44,
          duration: 1,
        },
        "intro",
      )
      .to(
        sceneState,
        {
          portalTravel: 1,
          portalSwirl: 1,
          portalFade: 0.2,
          duration: 1,
        },
        "intro",
      )
      .addLabel("figure", 1)
      .to(
        cameraState,
        {
          x: 0.8,
          y: 1.3,
          z: -14,
          targetY: 3,
          targetZ: -28,
          fov: 42,
          duration: 1.25,
        },
        "figure",
      )
      .to(
        sceneState,
        {
          humanMorph: 1,
          figurePresence: 1,
          portalFade: 0.78,
          portalSwirl: 0.35,
          duration: 1.25,
        },
        "figure",
      )
      .addLabel("orbit", 2.25)
      .to(
        cameraState,
        {
          x: -1.2,
          y: 1.1,
          z: -46,
          targetX: 0,
          targetY: 0.4,
          targetZ: -72,
          fov: 39,
          duration: 1.15,
        },
        "orbit",
      )
      .to(
        sceneState,
        {
          humanDissolve: 1,
          orbitReveal: 1,
          orbitTravel: 1,
          duration: 1.15,
        },
        "orbit",
      )
      .addLabel("worlds", 3.4)
      .to(
        cameraState,
        {
          x: 5.6,
          y: 2.2,
          z: -92,
          targetX: 5,
          targetY: 1.4,
          targetZ: -117,
          fov: 38,
          duration: 1.3,
        },
        "worlds",
      )
      .to(
        sceneState,
        {
          worldsReveal: 1,
          worldsDrift: 0.45,
          orbitTravel: 1.45,
          duration: 1.3,
        },
        "worlds",
      )
      .to(
        cameraState,
        {
          x: -5.9,
          y: -1.6,
          targetX: -5.2,
          targetY: -1.1,
          targetZ: -130,
          duration: 1.15,
        },
        4.55,
      )
      .to(
        sceneState,
        {
          worldsDrift: 1,
          duration: 1.15,
        },
        4.55,
      )
      .addLabel("tunnel", 5.7)
      .to(
        cameraState,
        {
          x: 0,
          y: 0.45,
          z: -136,
          targetX: 0,
          targetY: 0,
          targetZ: -146,
          pathBlend: 1,
          pathProgress: 0.12,
          fov: 34,
          duration: 0.95,
        },
        "tunnel",
      )
      .to(
        sceneState,
        {
          tunnelReveal: 1,
          tunnelTravel: 0.2,
          duration: 0.95,
        },
        "tunnel",
      )
      .to(
        cameraState,
        {
          pathProgress: 0.92,
          duration: 2,
        },
        6.65,
      )
      .to(
        sceneState,
        {
          tunnelTravel: 1,
          endingCalm: 0.4,
          duration: 2,
        },
        6.65,
      )
      .addLabel("ending", 8.65)
      .to(
        cameraState,
        {
          pathBlend: 0,
          x: 0,
          y: 1.2,
          z: -192,
          targetX: 0,
          targetY: 0.4,
          targetZ: -205,
          fov: 41,
          calm: 1,
          duration: 1.35,
        },
        "ending",
      )
      .to(
        sceneState,
        {
          endingCalm: 1,
          tunnelReveal: 0.55,
          worldsDrift: 0.2,
          duration: 1.35,
        },
        "ending",
      );
  }

  destroy() {
    this.timeline?.scrollTrigger?.kill();
    this.timeline?.kill();

    ScrollTrigger.removeEventListener("refresh", this.handleRefresh);
    gsap.ticker.remove(this.handleGsapTick);

    if (this.lenis) {
      this.lenis.off("scroll", this.handleLenisScroll);
      this.lenis.destroy();
    }

    if (typeof window !== "undefined") {
      delete window.__portfolioCinematicState;
    }

    if (typeof document !== "undefined") {
      const root = document.documentElement;

      root.style.removeProperty("--cinema-progress");
      root.style.removeProperty("--cinema-drift-x");
      root.style.removeProperty("--cinema-drift-y");
      root.style.removeProperty("--cinema-depth");
      root.style.removeProperty("--cinema-calm");
    }
  }
}
