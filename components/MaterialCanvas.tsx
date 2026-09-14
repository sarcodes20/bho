"use client";

import { useEffect, useRef } from "react";
import { renderMaterialField } from "@/lib/material-field";
import type { MaterialPalette } from "@/data/types";

/**
 * Draws a metal's material field onto a canvas.
 *
 * Rendering is deferred until the canvas is near the viewport — a full-size
 * field is thousands of shaded particles, and there is no reason to pay for
 * six of them before the section is reachable. Resizes are debounced because
 * the field has to be redrawn at the new pixel size, not stretched.
 */
export default function MaterialCanvas({
  palette,
  seed,
  quality = 1,
  className,
}: {
  palette: MaterialPalette;
  seed: string;
  quality?: number;
  className?: string;
}) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;

    let drawn = false;
    const draw = () => {
      if (!canvas.clientWidth) return;
      renderMaterialField(canvas, palette, { seed, quality });
      drawn = true;
    };

    let observer: IntersectionObserver | undefined;
    if (typeof IntersectionObserver !== "undefined") {
      observer = new IntersectionObserver(
        (entries) => {
          if (entries.some((e) => e.isIntersecting)) {
            draw();
            observer?.disconnect();
          }
        },
        { rootMargin: "300px" }
      );
      observer.observe(canvas);
    } else {
      draw();
    }

    let timer: number | undefined;
    const onResize = () => {
      if (!drawn) return;
      window.clearTimeout(timer);
      timer = window.setTimeout(draw, 220);
    };
    window.addEventListener("resize", onResize);

    return () => {
      observer?.disconnect();
      window.clearTimeout(timer);
      window.removeEventListener("resize", onResize);
    };
  }, [palette, seed, quality]);

  return <canvas ref={ref} className={className} aria-hidden="true" />;
}
