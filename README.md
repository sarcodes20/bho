# BH Overseas

Corporate site for BH Overseas — Platinum Group Metals & Specialty Precious Metals.

There are two builds in this repository, and they share their design system, their
content and their material renderer. There is no second copy of anything visual.

| | What it is | How to run |
|---|---|---|
| **`/` (root)** | The production app: Next.js 15, TypeScript, Tailwind, Framer Motion | `npm install && npm run dev` |
| **`static-preview/`** | The same site as dependency-free HTML/CSS/JS | open `static-preview/index.html`, or `tools/serve.ps1` |

The static build exists because **Node.js is not installed on the machine this was
built on**. It is what the design was art-directed and visually verified against —
every layout decision, grade and breakpoint below was checked in a real browser
there. See [Verification](#verification) for exactly what is and isn't proven.

---

## Structure

```
app/                    Next.js App Router
  layout.tsx            fonts, metadata, JSON-LD, nav + footer
  page.tsx              the homepage (every section, single scroll)
  metals/               explorer + full forms/applications reference
  about/  capabilities/  contact/
  api/enquiry/route.ts  server-side validated enquiry endpoint
  sitemap.ts  robots.ts  not-found.tsx  icon.svg

components/             Nav, Hero, MetalExplorer, EnquiryForm, Sections, …
data/                   company.ts, metals.ts, types.ts  ← all copy lives here
lib/                    material-field.js, enquiry.ts
styles/                 design-system.css, components.css  ← shared by both builds
public/images/source/   supplied photography
static-preview/         the dependency-free build
tools/                  serve.ps1, build-static-data.sh
```

### Single sources of truth

- **Design** — `styles/design-system.css` + `styles/components.css`. The Next app
  imports them from `app/globals.css`; the static build links them directly.
- **Copy** — `data/company.ts` and `data/metals.ts`. The static build consumes a
  generated mirror. After editing either file run:

  ```bash
  npm run data:static
  ```

  which regenerates `static-preview/assets/data.js` (ES modules are blocked over
  `file://`, so the mirror publishes globals instead of exports).
- **Material rendering** — `lib/material-field.js`, authored as UMD so the React
  app imports it and the static build loads it as a classic script.

---

## Design system

**Principle: the material is the hero.** The ground is graphite, platinum and
ivory. One accent — platinum blue — carries identity and interaction.

```
Obsidian #0B0C0D   Graphite #151719   Carbon  #222426
Platinum #C7C9C8   Silver   #E4E5E3   Ivory   #F4F2ED   White #FAFAF8

Blue bright #21B6D3   Blue #079FC0   Deep #087C98   Ink #06657C   Pale #DDF4F7
```

### One accent, not two

The first build used a muted gold accent. It was **retired** rather than kept
alongside the blue: a restrained identity carrying both a warm and a cool mark
dilutes each, and neither ends up reading as the brand. Components never branch
on theme — they use `--accent`, which resolves to the bright cyan on near-black
and darkens to `--blue-ink` inside `.ctx-light` so contrast holds on ivory
(5.5:1).

**Blue is scarce by rule.** It appears on rules, technical data, interaction and
material light — never as a fill, a heading, or a card border. Measured on the
rendered homepage, 52 of 601 elements carry a blue mark (~9%), and nearly all of
them are small: atomic numbers, hairlines, nodes, field underlines. The single
filled-blue control on the entire site is **Submit enquiry** — the one action
the page exists to produce.

### Platinum under cool light

The signature is not a blue overlay. `.hero__light` and `.metal-panel__light`
use `mix-blend-mode: color-dodge`, which only lifts pixels that are *already*
bright — so the cyan lands on the specular faces of the granules and nowhere
else. A flat tint would read as a gradient; this reads as light reflecting off
metal, which is the whole idea. The material itself stays neutral.

### Typography

**Instrument Serif** (rarity, heritage) with **Inter** (precision, commerce) on a
fluid scale from 375px to 1728px. The hero deliberately jumps the scale — a
spoken line at `--step-3`, then the claim at `--step-7` (up to 12rem), which is
reserved for that one line and used nowhere else. Sections alternate dark →
ivory → dark.

Motion is restrained and purposeful: a slow light sweep across the hero, ~5%
parallax, line-by-line heading reveals, mask wipes on images, a blue spine that
draws itself down the capabilities. Everything honours `prefers-reduced-motion`,
in CSS and via Framer Motion's `MotionConfig reducedMotion="user"`.

### Where the template feel was removed

Three equal specimen tiles, five equal route boxes and four stacked capability
cards were the most template-like shapes on the page. They are now, respectively:
an asymmetric plate layout at three different aspect ratios and vertical offsets;
a single horizontal blue line with five nodes hanging from it; and a vertical
blue spine with a node per capability. Copy was cut roughly 30% throughout —
no facts removed, only repetition.

### Why the metals are drawn, not photographed

The supplied reference images are 228–1000px catalogue shots on white. Enlarged
behind type they read as low-resolution stock. So `lib/material-field.js`
generates each metal's field procedurally: a lit bed, depth-sorted particles each
shaded as a small solid with a contact shadow, then a specular pass whose
strength is a property of the metal. Platinum is bright and granular, Ruthenium a
fine matte graphite, Osmium dark, coarse and blue-cast. Deterministic, resolution
independent, and zero image bytes.

The photography is used where it is genuinely strong — the granule macro carries
the hero, graded to graphite — and the remaining specimen shots appear as
photographic plates in the ivory "Forms" section at their real resolution.

> One supplied image (platinum crucibles) carries a visible third-party
> watermark and is **not used**. Replace it with an unwatermarked original if you
> want that form shown.

---

## Content accuracy

Everything on the site traces to the supplied company document. Metal
descriptions, forms and applications are verbatim; the three-word descriptors
under each metal name are lifted from those same sentences, not invented.
Atomic numbers and weights are standard reference values.

**Deliberately absent**, because the company has not supplied them:

- telephone numbers, postal addresses, office locations
- CIN / GST or other identifiers
- certifications, accreditations, memberships
- client names, volumes, capacities, revenue, headcount
- environmental, recovery-rate or sustainability claims

Add them to `data/company.ts` when they exist — the layouts have room and nothing
else needs to change. The About section's world graphic is an **abstract
graticule** for this reason: it suggests international trade without asserting a
single location.

### Contact addresses

The site uses the three addresses given in the brief:

```
pr.singhal@bhoverseas.com   info@bhoverseas.com   sales@bhoverseas.com
```

The source document listed `prsinghal@` and `inquiry@` instead. **Please confirm
which set is correct** — they are all in `data/company.ts` under `emails`.

---

## The enquiry form

Modelled as a procurement interface rather than a contact form: metal, purity,
form and quantity are the first four fields, matching what the company asks
customers to provide.

Validation rules live in `lib/enquiry.ts` and are used by **both** the browser
and `POST /api/enquiry`, so the server can never accept what the form rejects.

Delivery is not wired to a mail provider, because no credentials came with the
brief and a guessed integration fails silently in production. Until you set
`ENQUIRY_WEBHOOK_URL`, the endpoint validates and returns `delivered: false`, and
the form hands the composed specification to the visitor's mail client — so no
enquiry is lost either way.

```bash
cp .env.example .env.local
# ENQUIRY_WEBHOOK_URL=https://…   any endpoint accepting a JSON POST
```

---

## Verification

Verified in-browser against the static build at 1440×900, 768×1024 and 390×844:

- hero, all ten sections, footer — layout, type, grading
- metal explorer: switching, keyboard (arrows/Home/End), per-metal fields
- enquiry form: required-field validation, error states, focus management
- mobile navigation drawer, mobile hero and form
- no console errors, no dead anchors, no duplicate IDs, no horizontal overflow
- lazy loading and image delivery

**Not verified: the Next.js build of the refinement pass.** The project has been
installed, built and deployed (`node_modules/`, `.next/` and `.vercel/` are all
present). But Node is not on the PATH of the machine this pass was made on, so
`tsc --noEmit` and `next build` have **not** been re-run against the changed
`.tsx` files. The CSS, data and material renderer are shared with the static
build and are verified; the React edits are hand-reviewed only. Re-run before
deploying:

```bash
npm install
npm run typecheck
npm run build
```

Expect to fix small things there. The visual design, CSS and material renderer
carry over unchanged, since both builds share those files.

---

## Serving the static build without Node

```powershell
powershell -ExecutionPolicy Bypass -File tools/serve.ps1 -Port 8787
# http://localhost:8787/static-preview/index.html
```

`tools/serve.ps1` is a small .NET `HttpListener` static server — a development
convenience only, not for production.

---

## Performance & accessibility

Every section is a React **server** component; only the nav, hero plate, metal
explorer, material canvases and enquiry form ship JavaScript. Scroll reveals run
from one `IntersectionObserver` in CSS rather than per-element Motion state.
Material fields render only once their section is within 300px of the viewport,
and are capped at 2× DPR.

Semantic landmarks, a skip link, a real ARIA tablist with roving tabindex,
labelled fields with `aria-invalid` and `aria-describedby`, visible focus rings
on a gold outline, and full `prefers-reduced-motion` support.
