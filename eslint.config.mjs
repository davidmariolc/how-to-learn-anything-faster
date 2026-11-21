import core from "ultracite/eslint/core";
import react from "ultracite/eslint/react";
import next from "ultracite/eslint/next";

const eslintConfig = [
  ...core,
  ...react,
  ...next,
  {
    rules: {
      "import-x/no-anonymous-default-export": "warn",
    },
  },
  {
    files: ["**/*.{ts,tsx,mts,cts}"],
    rules: {
      "@typescript-eslint/no-require-imports": "error",
    },
  },
  {
    files: ["app/\\[locale\\]/layout.tsx"],
    rules: {
      // Next.js compiles these font loader calls into CSS imports.
      "unicorn/no-top-level-side-effects": [
        "error",
        {
          allow: { "next/font/google": ["Geist", "Geist_Mono"] },
          checkUnknownCalls: true,
        },
      ],
    },
  },
];

export default eslintConfig;
