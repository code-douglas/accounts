import globals from "globals";
import pluginJs from "@eslint/js";


/** @type {import('eslint').Linter.Config[]} */
export default [
  { languageOptions: { globals: { ...globals.browser, ...globals.node } } },
  pluginJs.configs.recommended,
  {
    rules: {
      "no-unused-vars": "error",
      "no-undef": "error",
      "semi": "error",
      "indent": ["error", 2],
      "space-before-blocks": ["error", "always"],
      "object-curly-spacing": ["error", "always"],
      "eol-last": ["error", "always"],
      "max-len": ["error", { "code": 100, "ignoreComments": true }],
      "eqeqeq": ["error", "always"],
      "no-trailing-spaces": "error",
    }
  },
];
