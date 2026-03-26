"use client";

import { useEffect, useRef } from "react";

type DriftProps = {
  children: React.ReactNode;
  className?: string;
  strength?: number;
};

export function Drift({ children, className, strength = 18 }: DriftProps) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) {
      return;
    }

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      node.style.setProperty("--drift-offset", "0px");
      return;
    }

    let frame = 0;

    const update = () => {
      if (!ref.current) {
        return;
      }

      const rect = ref.current.getBoundingClientRect();
      const viewportMid = window.innerHeight / 2;
      const cardMid = rect.top + rect.height / 2;
      const progress = (cardMid - viewportMid) / viewportMid;
      const offset = Math.max(-strength, Math.min(strength, progress * strength));
      ref.current.style.setProperty("--drift-offset", `${offset}px`);
    };

    const handleScroll = () => {
      cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [strength]);

  return (
    <div ref={ref} className={`drift ${className ? ` ${className}` : ""}`}>
      <div className="drift__inner">{children}</div>
    </div>
  );
}
