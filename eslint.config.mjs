import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
    ],
  },
  {
    rules: {
      "react/no-unescaped-entities": "off",
      "@typescript-eslint/no-unused-vars": "warn",
      "@next/next/no-img-element": "warn", 
      "react-hooks/exhaustive-deps": "warn",
      "@typescript-eslint/no-explicit-any": "warn", // Changed to warn
      "@typescript-eslint/strict-boolean-expressions": "off",
      "@typescript-eslint/prefer-nullish-coalescing": "off",
      "@typescript-eslint/no-unnecessary-condition": "off",
    },
  },
];

export default eslintConfig;
