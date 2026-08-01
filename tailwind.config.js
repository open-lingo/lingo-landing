/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // RGB channel triples (see src/theme/tokens.css) so `<alpha-value>`
        // modifiers like `bg-accent/10` resolve to real CSS.
        background: "rgb(var(--color-background) / <alpha-value>)",
        surface: {
          DEFAULT: "rgb(var(--color-surface) / <alpha-value>)",
          muted: "rgb(var(--color-surface-muted) / <alpha-value>)",
          elevated: "rgb(var(--color-surface-elevated) / <alpha-value>)",
        },
        border: {
          DEFAULT: "rgb(var(--color-border) / <alpha-value>)",
          muted: "rgb(var(--color-border-muted) / <alpha-value>)",
        },
        "text-primary": "rgb(var(--color-text-primary) / <alpha-value>)",
        "text-secondary": "rgb(var(--color-text-secondary) / <alpha-value>)",
        "text-muted": "rgb(var(--color-text-muted) / <alpha-value>)",
        accent: {
          DEFAULT: "rgb(var(--color-accent) / <alpha-value>)",
          hover: "rgb(var(--color-accent-hover) / <alpha-value>)",
          muted: "rgb(var(--color-accent-muted) / <alpha-value>)",
          foreground: "rgb(var(--color-on-accent) / <alpha-value>)",
        },
        success: "rgb(var(--color-success) / <alpha-value>)",
        error: "rgb(var(--color-error) / <alpha-value>)",
        warning: "rgb(var(--color-warning) / <alpha-value>)",
        link: "rgb(var(--color-link) / <alpha-value>)",
        band: {
          DEFAULT: "rgb(var(--color-band) / <alpha-value>)",
          surface: "rgb(var(--color-band-surface) / <alpha-value>)",
          border: "rgb(var(--color-band-border) / <alpha-value>)",
          text: "rgb(var(--color-band-text) / <alpha-value>)",
          muted: "rgb(var(--color-band-muted) / <alpha-value>)",
          accent: "rgb(var(--color-band-accent) / <alpha-value>)",
          error: "rgb(var(--color-band-error) / <alpha-value>)",
          warning: "rgb(var(--color-band-warning) / <alpha-value>)",
          success: "rgb(var(--color-band-success) / <alpha-value>)",
        },
      },
      fontFamily: {
        sans: ["var(--font-family)"],
        mono: ["var(--font-mono)"],
        script: ["var(--font-script)"],
      },
      borderRadius: {
        sm: "var(--radius-sm)",
        md: "var(--radius-md)",
        lg: "var(--radius-lg)",
      },
      boxShadow: {
        card: "var(--shadow-card)",
        popover: "var(--shadow-popover)",
      },
    },
  },
  plugins: [],
};
