"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { KeyboardEvent } from "react";
import { AnimatePresence, MotionConfig, motion } from "framer-motion";
import { METALS } from "@/data/metals";
import MaterialCanvas from "@/components/MaterialCanvas";
import { Arrow } from "@/components/ui";

/** Fired by the index bar so it can drive the explorer without shared state. */
export const SELECT_METAL_EVENT = "bh:select-metal";

export default function MetalExplorer() {
  const [activeId, setActiveId] = useState(METALS[0].id);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const active = METALS.find((m) => m.id === activeId) ?? METALS[0];

  /* The index bar in the hero band selects a metal and scrolls here. */
  useEffect(() => {
    const onSelect = (e: Event) => {
      const id = (e as CustomEvent<string>).detail;
      if (METALS.some((m) => m.id === id)) setActiveId(id);
    };
    window.addEventListener(SELECT_METAL_EVENT, onSelect);
    return () => window.removeEventListener(SELECT_METAL_EVENT, onSelect);
  }, []);

  /* Roving tabindex: arrows move and select, Home/End jump to the ends. */
  const onKeyDown = useCallback(
    (e: KeyboardEvent<HTMLButtonElement>, index: number) => {
      const delta =
        e.key === "ArrowRight" || e.key === "ArrowDown"
          ? 1
          : e.key === "ArrowLeft" || e.key === "ArrowUp"
            ? -1
            : 0;

      let next = -1;
      if (delta !== 0) next = (index + delta + METALS.length) % METALS.length;
      else if (e.key === "Home") next = 0;
      else if (e.key === "End") next = METALS.length - 1;
      if (next < 0) return;

      e.preventDefault();
      setActiveId(METALS[next].id);
      tabRefs.current[next]?.focus();
    },
    []
  );

  return (
    <MotionConfig reducedMotion="user">
      <div
        className="explorer__tabs"
        role="tablist"
        aria-label="Platinum Group Metals"
      >
        {METALS.map((metal, i) => {
          const selected = metal.id === activeId;
          return (
            <button
              key={metal.id}
              ref={(el) => {
                tabRefs.current[i] = el;
              }}
              id={`tab-${metal.id}`}
              className="metal-tab"
              type="button"
              role="tab"
              aria-selected={selected}
              aria-controls="metal-panel"
              tabIndex={selected ? 0 : -1}
              onClick={() => setActiveId(metal.id)}
              onKeyDown={(e) => onKeyDown(e, i)}
            >
              <MaterialCanvas
                className="metal-tab__field"
                palette={metal.palette}
                seed={metal.id}
                quality={0.5}
              />
              {/* Selection frame + register ticks, drawn over the material. */}
              <span className="metal-tab__frame" aria-hidden="true" />
              <span className="metal-tab__top">
                <span className="metal-tab__num">{metal.number}</span>
                <span className="metal-tab__mass">{metal.mass}</span>
              </span>
              <span className="metal-tab__sym">{metal.symbol}</span>
              <span className="metal-tab__name">{metal.name}</span>
            </button>
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={active.id}
          id="metal-panel"
          className="metal-panel"
          role="tabpanel"
          aria-labelledby={`tab-${active.id}`}
          tabIndex={0}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="metal-panel__visual">
            <MaterialCanvas
              className="metal-panel__canvas"
              palette={active.palette}
              seed={active.id}
            />
            <span className="metal-panel__light" aria-hidden="true" />
            <div className="metal-panel__glyph">
              <span className="metal-panel__glyph-sym">{active.symbol}</span>
              <span className="metal-panel__glyph-num">
                {active.symbol} / {active.number}
              </span>
            </div>
          </div>

          <div className="metal-panel__body">
            <div className="metal-panel__heading">
              <h3 className="metal-panel__name">{active.name}</h3>
              <p className="metal-panel__tagline">
                {active.tagline.map((t) => (
                  <span key={t}>{t}</span>
                ))}
              </p>
            </div>

            <p className="metal-panel__desc">{active.description}</p>

            {/* Reference constants, not company claims. They are what make the
                panel read as a materials database rather than a catalogue. */}
            <dl className="metal-data">
              {[
                { k: "Atomic number", v: String(active.number), u: "" },
                { k: "Atomic mass", v: active.mass, u: "u" },
                { k: "Density", v: active.density, u: "g/cm³" },
                { k: "Melting point", v: active.meltingPoint, u: "°C" },
              ].map((d) => (
                <div className="metal-data__cell" key={d.k}>
                  <dt className="metal-data__k">{d.k}</dt>
                  <dd className="metal-data__v">
                    {d.v}
                    {d.u && <span className="unit">{d.u}</span>}
                  </dd>
                </div>
              ))}
            </dl>

            <div className="spec">
              <p className="spec__label">Available forms</p>
              <div className="spec__list">
                {active.forms.map((form) => (
                  <span className="spec__chip" key={form}>
                    {form}
                  </span>
                ))}
              </div>
              {active.formsNote && (
                <p className="spec__inline">
                  {active.formsNote.charAt(0).toUpperCase() +
                    active.formsNote.slice(1)}
                  .
                </p>
              )}
            </div>

            <div className="spec">
              <p className="spec__label">Applications</p>
              <p className="spec__inline">
                {active.applications.map((app, i) => (
                  <span key={app}>
                    {i > 0 && <span aria-hidden="true"> &nbsp;·&nbsp; </span>}
                    <b>{app}</b>
                  </span>
                ))}
              </p>
            </div>

            <div className="metal-panel__foot">
              <a
                className="btn"
                href="#enquiry"
              >
                Enquire about {active.name}
                <Arrow />
              </a>
              <span className="mono">Availability subject to specification</span>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </MotionConfig>
  );
}
