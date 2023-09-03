import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      white: "#FCFCFC",
      black: "#030303",
      lightBlack: "#55535F", // lol
      yellow: "#FED766",
      lightYellow: "#FFF281",
      gray: "#EFF1F3",
      darkGray: "#A0A0A0",
    },
    fontFamily: {
      sans: ["var(--font-inter)"],
      handwriting: ["var(--font-caveat)"],
    },
  },
  plugins: [],
};
export default config;
