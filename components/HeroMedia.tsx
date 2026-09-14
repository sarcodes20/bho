"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

/**
 * The hero plate and its parallax.
 *
 * Only this piece is a client component — the hero's type and actions stay on
 * the server. The image is always rendered scaled up so the translation can
 * never expose an edge, and the translation is deliberately small: the brief
 * is cinematic, not kinetic.
 */
export default function HeroMedia() {
  const ref = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const img = ref.current;
    if (!img) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let ticking = false;
    const update = () => {
      const y = window.scrollY;
      if (y < window.innerHeight * 1.2) {
        img.style.transform = `scale(1.08) translate3d(0, ${(y * 0.055).toFixed(2)}px, 0)`;
      }
      ticking = false;
    };
    const handler = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    };

    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <>
      <div className="hero__media" aria-hidden="true">
        <Image
          ref={ref}
          className="hero__img"
          src="/images/source/granules-lg.jpg"
          alt=""
          width={1000}
          height={552}
          priority
          sizes="100vw"
        />
      </div>
      <div className="hero__grade" aria-hidden="true" />
      <div className="hero__sweep" aria-hidden="true" />
    </>
  );
}
