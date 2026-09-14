/**
 * MATERIAL FIELD
 * ---------------------------------------------------------------------------
 * Renders a macro "material field" for a Platinum Group Metal onto a canvas.
 *
 * Why procedural rather than photography: the supplied reference images are
 * 228–1000px white-background catalogue shots. Enlarged behind type they read
 * as low-resolution stock. Generating the field instead gives every metal a
 * distinct, consistent, resolution-independent identity that matches its real
 * physical character — granule, powder, sponge or chunk — and costs no bytes.
 *
 * The look comes from four stacked cues:
 *   1. a lit bed (light source fixed at upper-left),
 *   2. depth-sorted particles, each shaded as a small solid with a rim,
 *   3. a contact shadow under each particle so the field stacks,
 *   4. a specular pass whose strength is a property of the metal.
 *
 * Deterministic: the same metal always renders the same field.
 *
 * Consumed as a classic script (window.MaterialField) by the static build and
 * as a module (import { renderMaterialField }) by the Next.js app.
 */
(function (root, factory) {
  if (typeof module === "object" && module.exports) module.exports = factory();
  else root.MaterialField = factory();
})(typeof self !== "undefined" ? self : this, function () {
  "use strict";

  /* ----------------------------------------------------------- utilities -- */

  /** Deterministic PRNG (mulberry32) so a metal's field never changes. */
  function rng(seed) {
    let t = seed >>> 0;
    return function () {
      t = (t + 0x6d2b79f5) >>> 0;
      let x = Math.imul(t ^ (t >>> 15), 1 | t);
      x = (x + Math.imul(x ^ (x >>> 7), 61 | x)) ^ x;
      return ((x ^ (x >>> 14)) >>> 0) / 4294967296;
    };
  }

  function hashString(str) {
    let h = 2166136261;
    for (let i = 0; i < str.length; i++) {
      h ^= str.charCodeAt(i);
      h = Math.imul(h, 16777619);
    }
    return h >>> 0;
  }

  function hexToRgb(hex) {
    const h = hex.replace("#", "");
    const v = h.length === 3 ? h.split("").map((c) => c + c).join("") : h;
    return [
      parseInt(v.slice(0, 2), 16),
      parseInt(v.slice(2, 4), 16),
      parseInt(v.slice(4, 6), 16),
    ];
  }

  function rgba(rgb, a) {
    return "rgba(" + rgb[0] + "," + rgb[1] + "," + rgb[2] + "," + a + ")";
  }

  function mix(a, b, t) {
    return [
      Math.round(a[0] + (b[0] - a[0]) * t),
      Math.round(a[1] + (b[1] - a[1]) * t),
      Math.round(a[2] + (b[2] - a[2]) * t),
    ];
  }

  /** Slight per-particle tonal variance keeps the field from looking printed. */
  function jitterTone(rgb, amount, rand) {
    const d = (rand() - 0.5) * 2 * amount;
    return [
      Math.max(0, Math.min(255, Math.round(rgb[0] + d))),
      Math.max(0, Math.min(255, Math.round(rgb[1] + d))),
      Math.max(0, Math.min(255, Math.round(rgb[2] + d * 1.04))),
    ];
  }

  /* ------------------------------------------------------ particle shapes -- */

  /** Rounded, slightly irregular — cast granules and shot. */
  function pathGranule(ctx, r, rand) {
    const pts = 9;
    ctx.beginPath();
    for (let i = 0; i <= pts; i++) {
      const a = (i / pts) * Math.PI * 2;
      const rr = r * (0.86 + rand() * 0.28);
      const x = Math.cos(a) * rr;
      const y = Math.sin(a) * rr * 0.92;
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.closePath();
  }

  /** Small angular fragments — milled powder. */
  function pathPowder(ctx, r, rand) {
    const pts = 5 + Math.floor(rand() * 3);
    ctx.beginPath();
    for (let i = 0; i < pts; i++) {
      const a = (i / pts) * Math.PI * 2 + rand() * 0.5;
      const rr = r * (0.6 + rand() * 0.7);
      const x = Math.cos(a) * rr;
      const y = Math.sin(a) * rr;
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.closePath();
  }

  /** Lobed, porous mass — metal sponge. */
  function pathSponge(ctx, r, rand) {
    const pts = 13;
    ctx.beginPath();
    for (let i = 0; i <= pts; i++) {
      const a = (i / pts) * Math.PI * 2;
      const lobe = 1 + Math.sin(a * 3.4 + rand() * 0.4) * 0.18;
      const rr = r * lobe * (0.78 + rand() * 0.34);
      const x = Math.cos(a) * rr;
      const y = Math.sin(a) * rr * 0.9;
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.closePath();
  }

  /** Faceted, blocky — dense crystalline mass. */
  function pathChunk(ctx, r, rand) {
    const pts = 6;
    ctx.beginPath();
    for (let i = 0; i < pts; i++) {
      const a = (i / pts) * Math.PI * 2 + 0.3;
      const rr = r * (0.7 + rand() * 0.55);
      const x = Math.cos(a) * rr;
      const y = Math.sin(a) * rr * 0.85;
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.closePath();
  }

  const SHAPES = {
    granule: pathGranule,
    powder: pathPowder,
    sponge: pathSponge,
    chunk: pathChunk,
  };

  /* ---------------------------------------------------------------- main -- */

  /**
   * @param {HTMLCanvasElement} canvas
   * @param {object} palette  MaterialPalette from data/metals.ts
   * @param {object} [opts]
   * @param {string} [opts.seed]    stable seed, normally the metal id
   * @param {number} [opts.quality] 0.35 for thumbnails, 1 for the hero panel
   */
  function renderMaterialField(canvas, palette, opts) {
    const o = opts || {};
    const quality = o.quality == null ? 1 : o.quality;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const cssW = Math.max(1, Math.round(rect.width || canvas.clientWidth || 600));
    const cssH = Math.max(1, Math.round(rect.height || canvas.clientHeight || 400));

    // Cap DPR: past 2x the extra particles cost far more than they show.
    const dpr = Math.min(typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1, 2);
    canvas.width = Math.round(cssW * dpr);
    canvas.height = Math.round(cssH * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const rand = rng(hashString((o.seed || "field") + ":" + palette.texture));

    const base = hexToRgb(palette.base);
    const mid = hexToRgb(palette.mid);
    const high = hexToRgb(palette.high);
    const shadow = mix(base, [0, 0, 0], 0.55);

    /* 1 — the bed, lit from the upper left ---------------------------------- */
    ctx.fillStyle = palette.base;
    ctx.fillRect(0, 0, cssW, cssH);

    const bed = ctx.createRadialGradient(
      cssW * 0.34, cssH * 0.26, 0,
      cssW * 0.34, cssH * 0.26, Math.max(cssW, cssH) * 0.95
    );
    bed.addColorStop(0, rgba(mix(base, mid, 0.42), 0.9));
    bed.addColorStop(0.55, rgba(mix(base, mid, 0.14), 0.75));
    bed.addColorStop(1, rgba(base, 0.9));
    ctx.fillStyle = bed;
    ctx.fillRect(0, 0, cssW, cssH);

    /* 2 — particles, depth sorted ------------------------------------------ */
    // Scale grain with the field so a thumbnail reads like the same material
    // viewed at the same magnification, not like coarser gravel.
    const scale = Math.max(0.42, Math.min(1.35, cssW / 900));
    const grain = palette.grain * scale;
    const area = cssW * cssH;

    // Packed, not scattered: a loose material is a surface, so the particle
    // count has to overfill the frame or the bed shows through as voids.
    const count = Math.round(((area / (grain * grain)) * 0.62 * palette.density) * quality);

    const drawShape = SHAPES[palette.texture] || pathGranule;

    // Two cohorts — a fine bed that closes the gaps, and larger pieces that
    // carry the light. Drawn together, sorted by depth.
    const particles = [];
    for (let i = 0; i < count; i++) {
      const hero = rand() < 0.38;
      particles.push({
        x: rand() * cssW,
        y: rand() * cssH,
        r: hero ? grain * (0.72 + rand() * 1.35) : grain * (0.28 + rand() * 0.36),
        rot: rand() * Math.PI * 2,
        tone: rand(),
        seed: rand(),
      });
    }
    particles.sort(function (a, b) { return a.y - b.y; });

    const lightX = -0.34;   // normalised light offset inside a particle
    const lightY = -0.38;

    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      // Particles further down sit deeper in shade — cheap global depth cue.
      const depth = (p.y / cssH) * 0.42;
      const body = jitterTone(
        mix(mid, base, Math.min(0.66, depth + p.tone * 0.3)),
        11,
        rand
      );

      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rot);

      // Sub-pixel-ish particles: a gradient per piece costs far more than it
      // shows, so the fine bed is flat-filled with a single highlight dab.
      if (p.r < 2.6) {
        drawShape(ctx, p.r, rng(p.seed * 1e6));
        ctx.fillStyle = rgba(mix(body, high, 0.12 + palette.specular * 0.12), 1);
        ctx.fill();
        ctx.restore();
        continue;
      }

      /* contact shadow, opposite the light */
      ctx.save();
      ctx.translate(p.r * 0.17, p.r * 0.22);
      drawShape(ctx, p.r * 1.02, rng(p.seed * 1e6));
      ctx.fillStyle = rgba(shadow, 0.58);
      ctx.fill();
      ctx.restore();

      /* body */
      drawShape(ctx, p.r, rng(p.seed * 1e6));
      const g = ctx.createRadialGradient(
        p.r * lightX, p.r * lightY, p.r * 0.04,
        0, 0, p.r * 1.25
      );
      // Keep the lit face well short of white — blown highlights are what
      // made this read as bokeh rather than metal.
      const hi = mix(body, high, 0.26 + palette.specular * 0.3);
      g.addColorStop(0, rgba(hi, 1));
      g.addColorStop(0.42, rgba(body, 1));
      g.addColorStop(1, rgba(mix(body, shadow, 0.62), 1));
      ctx.fillStyle = g;
      ctx.fill();

      /* rim light on the shaded edge — reads as a hard metal surface */
      if (palette.specular > 0.45) {
        ctx.lineWidth = Math.max(0.4, p.r * 0.05);
        ctx.strokeStyle = rgba(mix(body, high, 0.28), 0.16 * palette.specular);
        ctx.stroke();
      }

      /* specular — only on pieces large enough to hold one */
      if (palette.specular > 0.3 && p.r > grain * 0.75) {
        const sr = p.r * (0.1 + palette.specular * 0.1);
        const sg = ctx.createRadialGradient(
          p.r * lightX, p.r * lightY, 0,
          p.r * lightX, p.r * lightY, sr * 2.2
        );
        sg.addColorStop(0, rgba(high, 0.5 * palette.specular));
        sg.addColorStop(1, rgba(high, 0));
        ctx.fillStyle = sg;
        ctx.beginPath();
        ctx.arc(p.r * lightX, p.r * lightY, sr * 2.2, 0, Math.PI * 2);
        ctx.fill();
      }

      /* sponge porosity — a few dark voids per mass */
      if (palette.texture === "sponge" && p.r > grain * 0.7) {
        const pr = rng(p.seed * 7e5);
        const pores = 2 + Math.floor(pr() * 3);
        for (let k = 0; k < pores; k++) {
          const a = pr() * Math.PI * 2;
          const d = p.r * pr() * 0.6;
          ctx.beginPath();
          ctx.arc(Math.cos(a) * d, Math.sin(a) * d, p.r * (0.07 + pr() * 0.11), 0, Math.PI * 2);
          ctx.fillStyle = rgba(shadow, 0.5);
          ctx.fill();
        }
      }

      ctx.restore();
    }

    /* 3 — atmosphere: metal cast, then falloff ----------------------------- */
    ctx.fillStyle = palette.cast;
    ctx.fillRect(0, 0, cssW, cssH);

    const fall = ctx.createRadialGradient(
      cssW * 0.36, cssH * 0.3, Math.min(cssW, cssH) * 0.12,
      cssW * 0.5, cssH * 0.5, Math.max(cssW, cssH) * 0.82
    );
    fall.addColorStop(0, "rgba(0,0,0,0)");
    fall.addColorStop(0.62, "rgba(0,0,0,0.16)");
    fall.addColorStop(1, "rgba(0,0,0,0.6)");
    ctx.fillStyle = fall;
    ctx.fillRect(0, 0, cssW, cssH);
  }

  return { renderMaterialField: renderMaterialField };
});
