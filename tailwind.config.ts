import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
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
      fontFamily: {
        pixel: ['"Press Start 2P"', 'cursive'],
        retro: ['"VT323"', 'monospace'],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        google: {
          blue: "hsl(var(--google-blue))",
          red: "hsl(var(--google-red))",
          yellow: "hsl(var(--google-yellow))",
          green: "hsl(var(--google-green))",
        },
        retro: {
          cyan: "hsl(var(--retro-cyan))",
          magenta: "hsl(var(--retro-magenta))",
          yellow: "hsl(var(--retro-yellow))",
          green: "hsl(var(--retro-green))",
          orange: "hsl(var(--retro-orange))",
          purple: "hsl(var(--retro-purple))",
          pink: "hsl(var(--retro-pink))",
          lime: "hsl(var(--retro-lime))",
        },
        pixel: {
          shadow: "hsl(var(--pixel-shadow))",
          highlight: "hsl(var(--pixel-highlight))",
          glow: "hsl(var(--pixel-glow))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        pixel: "0px",
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
        "fade-in": {
          from: { opacity: "0", transform: "translateY(10px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "pixel-bounce": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "pixel-float": {
          "0%, 100%": { transform: "translateY(0) rotate(0deg)" },
          "25%": { transform: "translateY(-8px) rotate(2deg)" },
          "75%": { transform: "translateY(4px) rotate(-2deg)" },
        },
        "retro-glow": {
          "0%, 100%": { boxShadow: "0 0 5px hsl(var(--primary)), 0 0 10px hsl(var(--primary) / 0.5)" },
          "50%": { boxShadow: "0 0 20px hsl(var(--primary)), 0 0 40px hsl(var(--primary) / 0.5)" },
        },
        "color-cycle": {
          "0%": { color: "hsl(var(--retro-cyan))" },
          "25%": { color: "hsl(var(--retro-magenta))" },
          "50%": { color: "hsl(var(--retro-yellow))" },
          "75%": { color: "hsl(var(--retro-green))" },
          "100%": { color: "hsl(var(--retro-cyan))" },
        },
        "crt-flicker": {
          "0%, 100%": { opacity: "1" },
          "92%": { opacity: "1" },
          "93%": { opacity: "0.8" },
          "94%": { opacity: "1" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.3s ease-out forwards",
        "pixel-bounce": "pixel-bounce 1s ease-in-out infinite",
        "pixel-float": "pixel-float 4s ease-in-out infinite",
        "retro-glow": "retro-glow 2s ease-in-out infinite",
        "color-cycle": "color-cycle 5s linear infinite",
        "crt-flicker": "crt-flicker 5s linear infinite",
      },
      boxShadow: {
        'pixel': '4px 4px 0 hsl(var(--pixel-shadow))',
        'pixel-lg': '6px 6px 0 hsl(var(--pixel-shadow))',
        'retro-glow': '0 0 10px hsl(var(--primary)), 0 0 20px hsl(var(--primary) / 0.5)',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
