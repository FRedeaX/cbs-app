module.exports = {
  extends: [
    "stylelint-config-standard",
    "stylelint-config-clean-order",
    "stylelint-prettier/recommended",
  ],
  rules: {
    "color-function-notation": "legacy",
    "selector-class-pattern": "[a-z]+|_([a-z]+)?([a-z]+[A-Z][a-z]+)?",
  },
};
