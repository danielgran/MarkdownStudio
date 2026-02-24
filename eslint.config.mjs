import withNuxt from "./.nuxt/eslint.config.mjs";

export default withNuxt({
  rules: {
    "vue/singleline-html-element-content-newline": "off",
    "@stylistic/arrow-parens": "off",
    "@stylistic/operator-linebreak": "off",
    // Formatting rules to replace Prettier
    "@stylistic/indent": ["error", 2],
    "@stylistic/quotes": ["error", "double"],
    "@stylistic/semi": ["error", "always"],
    "@stylistic/no-multiple-empty-lines": ["error", { max: 1 }],
    "@stylistic/eol-last": ["error", "always"],
    "@stylistic/space-before-function-paren": [
      "error",
      {
        anonymous: "always",
        named: "never",
        asyncArrow: "always",
      },
    ],
    "@stylistic/space-infix-ops": "error",
    "@stylistic/key-spacing": ["error", { beforeColon: false, afterColon: true }],
    "@stylistic/object-curly-spacing": ["error", "always"],
    "@stylistic/array-bracket-spacing": ["error", "never"],
    "@stylistic/computed-property-spacing": ["error", "never"],
    "@stylistic/space-before-blocks": "error",
    "@stylistic/keyword-spacing": "error",
    "@stylistic/no-trailing-spaces": "error",
    "@stylistic/spaced-comment": ["error", "always"],
  },
});

