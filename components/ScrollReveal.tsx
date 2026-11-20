"use client";

import { useEffect } from "react";

const SELECTOR = "[data-reveal], .reveal-lines, .mask-reveal, .principle, .caps";

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
  /*
   * Arriving from another page with a section in the address (/#capabilities,
   * from the menu or the footer), the browser's own jump fires before fonts
   * and hydration settle and is lost, leaving the visitor on the hero. Once the
   * page has settled, jump to the section ourselves. scroll-margin-top on the
   * section keeps the landing spot the same as an on-page menu click.
   */
  useEffect(() => {
    const id = decodeURIComponent(window.location.hash.slice(1));
    if (!id || !document.getElementById(id)) return;

    // Never fight the visitor: once they scroll themselves, stop.
    let userMoved = false;
    const stop = () => { userMoved = true; };
    const events = ["wheel", "touchstart", "keydown"] as const;
    events.forEach((e) => window.addEventListener(e, stop, { once: true, passive: true }));

    const jump = () => {
      if (userMoved) return;
      document.getElementById(id)?.scrollIntoView({ block: "start", behavior: "instant" });
    };
    const timers: number[] = [];
    const settle = () => {
      requestAnimationFrame(jump);
      // Late layout work during start-up can still reset the position; check
      // again shortly after.
      timers.push(window.setTimeout(jump, 400), window.setTimeout(jump, 1200));
    };
    const fonts = document.fonts?.ready ?? Promise.resolve();
    const afterLoad = () => fonts.then(settle);
    if (document.readyState === "complete") afterLoad();
    else window.addEventListener("load", afterLoad, { once: true });

    return () => {
      timers.forEach(clearTimeout);
      window.removeEventListener("load", afterLoad);
      events.forEach((e) => window.removeEventListener(e, stop));
    };
  }, []);

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
