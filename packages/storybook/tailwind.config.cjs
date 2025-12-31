const { heroui } = require("@heroui/theme/plugin");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./.storybook/introduction.mdx",
    "./registry/**/*.{js,jsx,ts,tsx,mdx}",
    "../components/*/src/**/*.{js,jsx,ts,tsx}",
    "../components/*/stories/**/*.{js,jsx,ts,tsx}",
    "../core/theme/src/components/**/*.{js,jsx,ts,tsx}",
    "../core/theme/src/utils/**/*.{js,jsx,ts,tsx}",
    "../core/theme/stories/**/*.{js,jsx,ts,tsx}",
    "../../node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
    "../../node_modules/.pnpm/@heroui+theme@*/node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  plugins: [
    heroui({
      addCommonColors: true,
      themes: {},
    }),
  ],
};
