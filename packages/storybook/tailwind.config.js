import { heroui } from "@heroui-mobile/theme";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./.storybook/welcome.mdx",
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
