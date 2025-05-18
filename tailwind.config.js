/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: "#007dfc",
        // Add Christmas colors
        redChristmas: "#f44336", // You can adjust the shade
        greenChristmas: "#4caf50", // You can adjust the shade
      },
      animation: {
        snowing: "snow 10s infinite linear", // Add snow animation
      },
      keyframes: {
        snow: {
          "0%": { transform: "translateY(-100px)", opacity: 1 },
          "100%": { transform: "translateY(100vh)", opacity: 0 },
        },
      },
    },
  },
  plugins: [],
};
