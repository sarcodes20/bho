"use client";

import { useEffect } from "react";

const SELECTOR = "[data-reveal], .reveal-lines, .mask-reveal, .principle";

/**
 * One IntersectionObserver for every reveal on the page.
 *
 * Deliberately not Framer Motion: these are one-shot opacity/transform
 * transitions already declared in CSS, so driving them from JS would add
 * per-element React state and re-renders for no visual gain. Framer Motion is
 * used where it earns its weight — the metal panel swap and the mobile drawer.
 *
 * Because every section stays a server component, this is the only script the
 * static parts of the page need.
 */
export default function ScrollReveal() {
  useEffect(() => {
    const targets = Array.from(document.querySelectorAll<HTMLElement>(SELECTOR));
    if (!targets.length) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || typeof IntersectionObserver === "undefined") {
      targets.forEach((t) => t.classList.add("is-revealed"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-revealed");
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.08 }
    );

    targets.forEach((t) => observer.observe(t));

    // Anything already on screen at mount reveals immediately rather than
    // waiting for the first scroll.
    requestAnimationFrame(() => {
      targets.forEach((t) => {
        const r = t.getBoundingClientRect();
        if (r.top < window.innerHeight && r.bottom > 0) {
          t.classList.add("is-revealed");
          observer.unobserve(t);
        }
      });
    });

    return () => observer.disconnect();
  }, []);

  return null;
}
