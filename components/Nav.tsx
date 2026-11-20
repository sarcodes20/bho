"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, MotionConfig, motion } from "framer-motion";
import { COMPANY } from "@/data/company";

export default function Nav() {
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const [active, setActive] = useState<string>("");
  const pathname = usePathname();

  /**
   * Section anchors live on the homepage. From any other route they have to be
   * addressed as `/#section` or they resolve to nothing.
   */
  const onHome = pathname === "/";
  const sectionHref = (hash: string) => (onHome ? hash : `/${hash}`);

  /* ---- scroll state --------------------------------------------------- */
  useEffect(() => {
    let ticking = false;

    // The navigation is persistent: the only scroll-driven change is the
    // transition from transparent to the solid, blurred surface.
    const onScroll = () => {
      setSolid(window.scrollY > 24);
      ticking = false;
    };

    const handler = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(onScroll);
    };

    window.addEventListener("scroll", handler, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", handler);
  }, []);

  /* ---- active section ------------------------------------------------- */
  useEffect(() => {
    const ids = COMPANY.nav.map((n) => n.href.replace(/^.*#/, ""));
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));
    if (!sections.length || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  /* ---- drawer --------------------------------------------------------- */
  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    document.body.classList.toggle("is-locked", open);
    return () => document.body.classList.remove("is-locked");
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        close();
        toggleRef.current?.focus();
      }
    };
    const onResize = () => {
      if (window.innerWidth > 900) close();
    };
    document.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      document.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [open, close]);

  const navClass = ["nav", solid ? "is-solid" : ""].filter(Boolean).join(" ");

  return (
    // reducedMotion="user" makes every Motion animation in the tree respect
    // prefers-reduced-motion, matching the CSS side of the design system.
    <MotionConfig reducedMotion="user">
      <header className={navClass}>
        <div className="shell">
          <div className="nav__inner">
            <Link className="nav__brand" href="/" aria-label={`${COMPANY.name} — home`}>
              <span className="nav__wordmark">{COMPANY.wordmark}</span>
              <span className="nav__descriptor">{COMPANY.descriptor}</span>
            </Link>

            <nav className="nav__links" aria-label="Primary">
              {COMPANY.nav.map((item) => {
                const id = item.href.replace(/^.*#/, "");
                return (
                  <a
                    key={item.href}
                    className={`nav__link${active === id ? " is-active" : ""}`}
                    href={sectionHref(item.href)}
                    aria-current={active === id ? "true" : undefined}
                  >
                    {item.label}
                  </a>
                );
              })}
            </nav>

            <a className="btn btn--ghost nav__cta" href={sectionHref("#enquiry")}>
              Enquire
            </a>

            <button
              ref={toggleRef}
              className="nav__toggle"
              type="button"
              aria-expanded={open}
              aria-controls="nav-drawer"
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((v) => !v)}
            >
              <span className="nav__toggle-bars" aria-hidden="true">
                <span />
                <span />
              </span>
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <>
            {/* Dims and softly blurs the page behind; tapping it closes. */}
            <motion.div
              key="scrim"
              className="nav__scrim"
              aria-hidden="true"
              onClick={close}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            />

            {/* A sheet that slides in from the right. Motion alone drives it:
                the panel's CSS carries no transitions, so nothing fights the
                animation frame by frame. */}
            <motion.div
              key="panel"
              id="nav-drawer"
              className="nav__panel"
              role="dialog"
              aria-modal="true"
              aria-label="Menu"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
              onClick={(e) => {
                const link = (e.target as HTMLElement).closest("a");
                if (!link) return;
                const href = link.getAttribute("href") ?? "";
                close();
                // The open menu locks page scrolling, so a same-page jump made
                // while it is open goes nowhere. Close first, then scroll once
                // the lock has been released.
                if (href.startsWith("#")) {
                  e.preventDefault();
                  window.setTimeout(() => {
                    document.getElementById(href.slice(1))?.scrollIntoView({ block: "start" });
                    history.pushState(null, "", href);
                  }, 60);
                }
              }}
            >
              <nav className="nav__drawer-links" aria-label="Mobile">
                {COMPANY.nav.map((item, i) => (
                  <motion.a
                    key={item.href}
                    className="nav__drawer-link"
                    href={sectionHref(item.href)}
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      delay: 0.16 + i * 0.045,
                      duration: 0.45,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    <span className="idx">{String(i + 1).padStart(2, "0")}</span>
                    {item.label}
                  </motion.a>
                ))}
              </nav>

              <motion.div
                className="nav__drawer-foot"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.42, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              >
                <a className="btn" href={sectionHref("#enquiry")}>
                  Make an enquiry
                  <span className="btn__arrow" aria-hidden="true">
                    &#8594;
                  </span>
                </a>
                <a className="nav__drawer-mail" href={`mailto:${COMPANY.email}`}>
                  {COMPANY.email}
                </a>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </MotionConfig>
  );
}
