import type { CSSProperties } from "react";
import { COMPANY } from "@/data/company";
import { Arrow, DisplayLines } from "@/components/ui";
import HeroMedia from "@/components/HeroMedia";

export default function Hero() {
  return (
    <section className="hero" aria-labelledby="heroTitle">
      <HeroMedia />

      <div className="shell hero__body">
        <p className="eyebrow hero__eyebrow" data-reveal>
          {COMPANY.hero.eyebrow}
        </p>

        <DisplayLines
          as="h1"
          size="xl"
          id="heroTitle"
          className="hero__title"
          lines={COMPANY.hero.title}
        />

        <p
          className="lede hero__lede"
          data-reveal
          style={{ "--reveal-delay": "420ms" } as CSSProperties}
        >
          {COMPANY.hero.lede}
        </p>

        <div
          className="hero__actions"
          data-reveal
          style={{ "--reveal-delay": "560ms" } as CSSProperties}
        >
          <a className="btn" href="#metals">
            Explore our metals
            <Arrow />
          </a>
          <a className="btn btn--ghost" href="#enquiry">
            Make an enquiry
          </a>
        </div>
      </div>

      <div className="shell">
        <div className="hero__foot">
          <a className="hero__scroll" href="#about">
            <span className="hero__scroll-track" aria-hidden="true" />
            Scroll
          </a>
          <p className="mono hero__stamp">{COMPANY.hero.stamp}</p>
        </div>
      </div>
    </section>
  );
}
