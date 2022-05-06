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
  },
};
