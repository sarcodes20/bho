import type { CSSProperties } from "react";
import { COMPANY } from "@/data/company";
import { METALS } from "@/data/metals";
import { Arrow } from "@/components/ui";
import HeroMedia from "@/components/HeroMedia";

/**
 * The hero is authored by hand rather than through <DisplayLines> because its
 * two lines are deliberately set at different sizes — a spoken line, then the
 * claim at the top of the scale. That contrast is the point, and a generic
 * headline component would flatten it.
 */
export default function Hero() {
  return (
    <section className="hero" aria-labelledby="heroTitle">
      <HeroMedia />

      <div className="shell hero__body">
        <p className="eyebrow hero__eyebrow" data-reveal>
          {COMPANY.hero.eyebrow}
        </p>

        <h1 className="display hero__title reveal-lines" id="heroTitle">
          <span className="line line--sm">
            <span style={{ "--i": 0 } as CSSProperties}>{COMPANY.hero.titleLead}</span>
          </span>
          <span className="line line--xl">
            <span style={{ "--i": 1 } as CSSProperties}>{COMPANY.hero.titleMain}</span>
          </span>
        </h1>

        <div className="hero__meta">
          <div
            className="hero__actions"
            data-reveal
            style={{ "--reveal-delay": "520ms" } as CSSProperties}
          >
            <a className="btn" href="#metals">
              Explore our products
              <Arrow />
            </a>
            <a className="btn btn--ghost" href="#enquiry">
              Make an enquiry
            </a>
          </div>

          <p
            className="hero__lede"
            data-reveal
            style={{ "--reveal-delay": "620ms" } as CSSProperties}
          >
            {COMPANY.hero.lede}
          </p>
        </div>
      </div>

      <div className="shell">
        <div className="hero__foot">
          <a className="hero__scroll" href="#about">
            <span className="hero__scroll-track" aria-hidden="true" />
            Scroll
          </a>

          {/* The six as a technical index, not a tagline. */}
          <ul className="hero__index">
            {METALS.map((metal) => (
              <li key={metal.id}>
                <span className="sym">{metal.symbol}</span>
                <span className="num">{metal.number}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
