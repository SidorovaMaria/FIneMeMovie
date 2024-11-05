/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        color: { background: "var(--background)" },
        accent: {
          1: "var(--accent1)",
          2: "var(--accent2)",
          3: "var(--accent3)",
        },
      },
      fontFamily: {
        fancy: "var(--font-fascinate)",
        nunito: "var(--font-nunito-sans)",
      },
    },
  },
  plugins: [],
};
