module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    "eslint:recommended",
    "plugin:react-hooks/recommended",
    "plugin:storybook/recommended",
    "airbnb",
    "airbnb-typescript",
    "plugin:@typescript-eslint/recommended",
    "prettier",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2020,
    sourceType: "module",
    project: ["./tsconfig.json", "./tsconfig.node.json"],
    tsconfigRootDir: __dirname,
  },
  plugins: ["react-refresh", "@typescript-eslint", "prettier"],
  ignorePatterns: ["dist", ".eslintrc.cjs", "vite.config.ts"],
  rules: {
    "react-refresh/only-export-components": [
      "warn",
      { allowConstantExport: true },
    ],
    "react/prop-types": "off",
    "react/require-default-props": [
      "warn",
      {
        forbidDefaultForRequired: true,
        classes: "defaultProps",
        functions: "ignore",
        ignoreFunctionalComponents: true,
      },
    ],
    "react/react-in-jsx-scope": 0,
    "@typescript-eslint/lines-between-class-members": "off",
    "react/function-component-definition": [
      2,
      {
        namedComponents: ["function-declaration", "arrow-function"],
        unnamedComponents: "arrow-function",
      },
    ],
    "import/prefer-default-export": "off",
    "react/no-array-index-key": "off",
    "react/no-unstable-nested-components": "off",
    "@typescript-eslint/default-param-last": "off",
    "jsx-a11y/click-events-have-key-events": "off",
    "jsx-a11y/no-static-element-interactions": "off",
    "import/no-extraneous-dependencies": "off",
    "react/jsx-props-no-spreading": [
      "error",
      {
        html: "enforce",
        custom: "ignore",
        exceptions: ["Image", "img"],
      },
    ],
  },
};
