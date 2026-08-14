import type { Config } from "tailwindcss";

/**
 * BrandQube design tokens.
 * Colors are driven by CSS variables (see globals.css) so a single `.dark`
 * class on <html> flips the entire system:
 *   Light  → white page, indigo ink, blue accent
 *   Dark   → #242A56 indigo canvas, white/tint text, #6878D6 accent
 * Every value stays 100% inside the approved BrandQube palette.
 */
const withOpacity = (variable: string) => `rgb(var(${variable}) / <alpha-value>)`;

const config: Config = {
  darkMode: "class",
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Semantic tokens (driven by globals.css variables)
        bg: withOpacity("--c-bg"),
        surface: withOpacity("--c-surface"),
        "surface-2": withOpacity("--c-surface-2"),
        fg: withOpacity("--c-fg"),
        muted: withOpacity("--c-muted"),
        primary: withOpacity("--c-primary"),
        secondary: withOpacity("--c-secondary"),
        accent: withOpacity("--c-accent"),
        tint: withOpacity("--c-tint"),
        border: withOpacity("--c-border"),
        hairline: withOpacity("--c-hairline"),

        // Fixed brand anchors (PDF exact color palette)
        brand: {
          DEFAULT: "#009BE3",
          light: "#009BE3",
          accent: "#EE3542",
          steel: "#16284F",
          tint: "#E6F5FC",
        },
        ink: {
          DEFAULT: "#16284F",
          700: "#16284F",
          500: "#223B70",
        },
      },
      fontFamily: {
        sans: ["var(--font-body)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "var(--font-body)", "sans-serif"],
      },
      fontSize: {
        // Fluid editorial scale (clamp). Bebas Neue is tall + condensed, so the
        // display tiers run tighter leading; +tracking keeps all-caps legible.
        "display-2xl": ["clamp(2.75rem, 9vw, 10.5rem)", { lineHeight: "0.86", letterSpacing: "0.01em" }],
        "display-xl": ["clamp(2.35rem, 7.5vw, 8.5rem)", { lineHeight: "0.88", letterSpacing: "0.01em" }],
        "display-lg": ["clamp(2rem, 5.5vw, 5.5rem)", { lineHeight: "0.9", letterSpacing: "0.012em" }],
        "display-md": ["clamp(1.75rem, 4vw, 3.5rem)", { lineHeight: "0.94", letterSpacing: "0.012em" }],
        eyebrow: ["clamp(0.75rem, 1.2vw, 0.8125rem)", { lineHeight: "1", letterSpacing: "0.18em" }],
      },
      spacing: {
        section: "clamp(3.5rem, 6vw, 7rem)",
      },
      maxWidth: {
        content: "1440px",
        prose: "68ch",
      },
      borderRadius: {
        xl2: "1.75rem",
      },
      boxShadow: {
        // Brand-tinted shadows — never pure black
        soft: "0 8px 30px rgba(16,28,63,0.07)",
        lift: "0 24px 60px -20px rgba(16,28,63,0.18)",
        glow: "0 0 40px -8px rgba(0,155,227,0.45)",
      },
      transitionTimingFunction: {
        brand: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
      keyframes: {
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
        "marquee-reverse": {
          from: { transform: "translateX(-50%)" },
          to: { transform: "translateX(0)" },
        },
      },
      animation: {
        marquee: "marquee var(--marquee-duration, 40s) linear infinite",
        "marquee-reverse": "marquee-reverse var(--marquee-duration, 40s) linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
