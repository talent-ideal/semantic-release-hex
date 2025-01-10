import js from "@eslint/js";
import importPlugin from "eslint-plugin-import";
import nodePlugin from "eslint-plugin-n";
import prettierConfig from "eslint-plugin-prettier/recommended";
import jestPlugin from "eslint-plugin-jest";
import globals from "globals";

export default [
  {
    files: ["**/*.js"],
  },
  {
    // Ignore patterns
    ignores: ["coverage/**"],
  },
  js.configs.recommended,
  nodePlugin.configs["flat/recommended-script"],
  importPlugin.flatConfigs.recommended,
  prettierConfig,
  {
    // Base settings
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...globals.node,
        ...globals.es6,
      },
    },
    rules: {
      "prettier/prettier": "warn",
      "n/file-extension-in-import": ["error", "always"],
    },
  },
  {
    // Jest settings for test files
    files: ["tests/**/*.js", "**/*.spec.js"],
    languageOptions: {
      globals: {
        ...globals.jest,
      },
    },
    plugins: {
      jest: jestPlugin,
    },
    rules: {
      ...jestPlugin.configs.recommended.rules,
      ...jestPlugin.configs.style.rules,
      "jest/no-conditional-expect": "off",
      "jest/prefer-expect-assertions": [
        "error",
        {
          onlyFunctionsWithAsyncKeyword: true,
          onlyFunctionsWithExpectInLoop: true,
          onlyFunctionsWithExpectInCallback: true,
        },
      ],
    },
  },
];
