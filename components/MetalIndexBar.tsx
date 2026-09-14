"use client";

import { METALS } from "@/data/metals";
import { SELECT_METAL_EVENT } from "@/components/MetalExplorer";

/**
 * The quiet band under the hero. Selecting an element drives the explorer via
 * a DOM event, which keeps both components independent — no provider, and the
 * bar still works as a plain anchor if scripting is unavailable.
 */
export default function MetalIndexBar() {
  return (
    <div className="index-bar">
      <div className="shell">
        <ul className="index-bar__inner">
          {METALS.map((metal) => (
            <li className="index-bar__cell" key={metal.id}>
              <a
                className="index-bar__item"
                href="#metals"
                onClick={() =>
                  window.dispatchEvent(
                    new CustomEvent(SELECT_METAL_EVENT, { detail: metal.id })
                  )
                }
              >
                <span className="index-bar__num">{metal.number}</span>
                <span className="index-bar__sym">{metal.symbol}</span>
                <span className="index-bar__name">{metal.name}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
