module.exports = {
  extends: [
    "stylelint-config-standard",
    "stylelint-config-rational-order",
    "stylelint-prettier/recommended",
  ],
  plugins: ["stylelint-order"],
  rules: {
    "order/order": [
      ["custom-properties", "declarations"],
      // {
      // 	"disableFix": true
      // }
    ],
    "color-function-notation": "legacy",
    "selector-class-pattern": "[a-z]+|_([a-z]+)?([a-z]+[A-Z][a-z]+)?",
  },
};
