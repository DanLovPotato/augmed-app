module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "plugin:cypress/recommended",
    "react-app",
    "react-app/jest",
  ],
  overrides: [
    {
      env: {
        node: true,
      },
      files: [".eslintrc.{js,cjs}"],
      parserOptions: {
        sourceType: "script",
      },
    },
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["@typescript-eslint", "react", "cypress"],
  rules: {
    "testing-library/prefer-screen-queries": "off",
    "testing-library/no-render-in-setup": "warn",
    "@typescript-eslint/no-var-requires": "off",  // using on jest mock
  },
};
