import config from "ultracite/prettier";

const prettierConfig = {
  ...config,
  plugins: ["prettier-plugin-tailwindcss"],
  tailwindStylesheet: "./app/globals.css",
};

export default prettierConfig;
