module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {},
  },
  variants: {
    extend: { typography: ["dark"] },
  },
  plugins: [require("@tailwindcss/typography")],
};
