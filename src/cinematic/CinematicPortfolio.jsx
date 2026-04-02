import { useEffect, useRef } from "react";
import { CinematicExperience } from "./core/CinematicExperience";

export default function CinematicPortfolio() {
  const canvasMountRef = useRef(null);
  const scrollTrackRef = useRef(null);

  useEffect(() => {
    if (!canvasMountRef.current || !scrollTrackRef.current) {
      return undefined;
    }

    const experience = new CinematicExperience({
      mountNode: canvasMountRef.current,
      scrollTrack: scrollTrackRef.current,
    });

    return () => {
      experience.destroy();
    };
  }, []);

  return (
    <div className="cinema-page" aria-hidden="true">
      <div ref={scrollTrackRef} className="cinema-scroll-track" />
      <div className="cinema-stage">
        <div ref={canvasMountRef} className="cinema-canvas-host" />
        <div className="cinema-vignette" />
        <div className="cinema-grain" />
      </div>
    </div>
  );
}
