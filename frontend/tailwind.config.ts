import type { Config } from "tailwindcss";

// Colours are semantic tokens defined as CSS variables in app/globals.css.
// Use these names (bg-surface, text-muted, border-line, bg-brand-600 ...) instead of hex values.
const v = (name: string) => `rgb(var(--${name}) / <alpha-value>)`;

export default {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        canvas: v("canvas"),
        surface: { DEFAULT: v("surface"), 2: v("surface-2"), 3: v("surface-3") },
        line: { DEFAULT: v("line"), strong: v("line-strong") },
        ink: v("ink"),
        muted: v("muted"),
        subtle: v("subtle"),
        brand: {
          100: v("brand-100"), 200: v("brand-200"), 300: v("brand-300"), 400: v("brand-400"),
          500: v("brand-500"), 600: v("brand-600"), 700: v("brand-700"), 800: v("brand-800"), 900: v("brand-900"),
        },
        accent: { DEFAULT: v("accent"), soft: v("accent-soft") },
        success: v("success"),
        warning: v("warning"),
        danger: v("danger"),
      },
      fontFamily: {
        sans: ["var(--font-body)", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "var(--font-body)", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      borderRadius: { card: "1rem", control: "0.75rem" },
      boxShadow: {
        card: "0 1px 0 rgb(255 255 255 / 0.04) inset, 0 12px 32px -16px rgb(0 0 0 / 0.6)",
        pop: "0 24px 48px -12px rgb(0 0 0 / 0.7)",
      },
      transitionTimingFunction: { out: "cubic-bezier(0.22, 1, 0.36, 1)" },
    },
  },
  plugins: [],
} satisfies Config;
