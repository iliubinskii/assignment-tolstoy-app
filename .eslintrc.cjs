/**
 * @type {import("eslint").Linter.Config}
 */
const config = {
  ignorePatterns: [
    "!.*",
    "/.vercel/**",
    "/coverage/**",
    "/node_modules/**",
    "/public/**"
  ],
  env: {
    browser: true,
    es2022: true
  },
  extends: ["union", "union/react"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: { jsx: true },
    ecmaVersion: 2022,
    project: "tsconfig.json",
    sourceType: "module"
  },
  rules: {
    "@cspell/spellchecker": [
      "warn",
      {
        cspell: {
          words:
            // @sorted
            [
              "cjsx",
              "csstools",
              "fontsource",
              "mjsx",
              "packagejson",
              "roboto",
              "smacss"
            ]
        }
      }
    ],
    "import/no-internal-modules": [
      "warn",
      {
        allow:
          // @sorted
          [
            "@fontsource/roboto/*",
            "@mui/icons-material/*",
            "@testing-library/jest-dom/matchers",
            "jest-extended/all",
            "react-dom/client"
          ]
      }
    ]
  }
};

module.exports = config;
