/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    './pages/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './app/**/*.{js,jsx}',
    './src/**/*.{js,jsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "var(--color-border)", // warm-nude
        input: "var(--color-input)", // subtle-warm-off-white
        ring: "var(--color-ring)", // soft-rose
        background: "var(--color-background)", // near-white
        foreground: "var(--color-foreground)", // charcoal-black
        primary: {
          DEFAULT: "var(--color-primary)", // soft-rose
          foreground: "var(--color-primary-foreground)", // charcoal-black
        },
        secondary: {
          DEFAULT: "var(--color-secondary)", // warm-nude
          foreground: "var(--color-secondary-foreground)", // charcoal-black
        },
        destructive: {
          DEFAULT: "var(--color-destructive)", // dusty-rose-red
          foreground: "var(--color-destructive-foreground)", // near-white
        },
        muted: {
          DEFAULT: "var(--color-muted)", // warm-nude
          foreground: "var(--color-muted-foreground)", // medium-gray
        },
        accent: {
          DEFAULT: "var(--color-accent)", // classic-gold
          foreground: "var(--color-accent-foreground)", // charcoal-black
        },
        popover: {
          DEFAULT: "var(--color-popover)", // near-white
          foreground: "var(--color-popover-foreground)", // charcoal-black
        },
        card: {
          DEFAULT: "var(--color-card)", // subtle-warm-off-white
          foreground: "var(--color-card-foreground)", // charcoal-black
        },
        success: {
          DEFAULT: "var(--color-success)", // muted-green
          foreground: "var(--color-success-foreground)", // near-white
        },
        warning: {
          DEFAULT: "var(--color-warning)", // dark-gold
          foreground: "var(--color-warning-foreground)", // near-white
        },
        error: {
          DEFAULT: "var(--color-error)", // dusty-rose-red
          foreground: "var(--color-error-foreground)", // near-white
        },
      },
      fontFamily: {
        'heading': ['Playfair Display', 'serif'],
        'body': ['Inter', 'sans-serif'],
        'caption': ['Lato', 'sans-serif'],
        'mono': ['JetBrains Mono', 'monospace'],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      boxShadow: {
        'luxury-sm': '0 2px 8px rgba(232, 180, 184, 0.15)',
        'luxury-md': '0 4px 16px rgba(232, 180, 184, 0.2)',
        'luxury-lg': '0 8px 32px rgba(232, 180, 184, 0.25)',
      },
      transitionTimingFunction: {
        'luxury': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
  ],
}