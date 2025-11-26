// @ts-check
import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import globals from "globals";

export default tseslint.config(
  // ⛔ Files to ignore
  {
    ignores: ["dist", "node_modules"],
  },

  // JS Recommended
  eslint.configs.recommended,

  // TS Recommended (Type-Checked)
  ...tseslint.configs.recommendedTypeChecked,

  // Language Options
  {
    languageOptions: {
      globals: {
        ...globals.node,
      },
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
        allowDefaultProject: true,
      },
    },
  },

  // RULES (ALWAYS MULTILINE IMPORTS)
  {
    rules: {
      "prettier/prettier": "off",

      // ⬇️ ALWAYS multiline imports
      "object-curly-newline": [
        "error",
        {
          ImportDeclaration: {
            multiline: true,
            minProperties: 1,
          },
        },
      ],

      // ⬇️ Enforce newline between properties
      "object-property-newline": ["error", { allowAllPropertiesOnSameLine: false }],

      // Optional: force each specifier on its own line
      "max-properties-per-line": ["error", { maximum: 1, ignoreSingleLine: true }],

      // TS Rules
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-floating-promises": "warn",
      "@typescript-eslint/no-unsafe-argument": "warn",
    },
  },
);
