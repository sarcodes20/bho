import type { Config } from "tailwindcss";

/**
 * Tailwind is configured against the same tokens as styles/design-system.css
 * so utilities and component classes never disagree.
 *
 * Preflight is off deliberately: the design system ships its own reset, and
 * Tailwind's would re-point `body` typography (notably `line-height: inherit`)
 * after our base layer had already set it.
 */
const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./data/**/*.{ts,tsx}",
  ],
  corePlugins: { preflight: false },
  theme: {
    extend: {
      colors: {
        obsidian: "#0B0C0D",
        graphite: "#151719",
        carbon: "#222426",
        platinum: "#C7C9C8",
        silver: "#E4E5E3",
        ivory: "#F4F2ED",
        gold: "#A99567",
        white: "#FAFAF8",
      },
      fontFamily: {
        display: ["var(--font-display)", "Times New Roman", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      fontSize: {
        "step--2": "var(--step--2)",
        "step--1": "var(--step--1)",
        "step-0": "var(--step-0)",
        "step-1": "var(--step-1)",
        "step-2": "var(--step-2)",
        "step-3": "var(--step-3)",
        "step-4": "var(--step-4)",
        "step-5": "var(--step-5)",
        "step-6": "var(--step-6)",
      },
      maxWidth: {
        shell: "var(--maxw)",
        measure: "var(--measure)",
      },
      transitionTimingFunction: {
        brand: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
