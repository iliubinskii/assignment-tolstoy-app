/**
 * @type {import("jest").Config}
 */
const config = {
  clearMocks: true,
  collectCoverage: false,
  collectCoverageFrom: ["src/**/*.{ts,tsx}", "!**/*.d.ts", "!src/main.tsx"],
  coverageDirectory: "coverage",
  coverageProvider: "babel",
  coverageReporters: ["lcov"],
  coverageThreshold: {
    // eslint-disable-next-line no-warning-comments -- Postponed
    // TODO: Better coverage
    global: {
      branches: 30,
      functions: 30,
      lines: 30,
      statements: 30
    }
  },
  preset: "ts-jest",
  setupFilesAfterEnv: ["./jest.setup-after-env.tsx"],
  testEnvironment: "@happy-dom/jest-environment",
  testPathIgnorePatterns: ["/node_modules/"],
  transform: {
    "^.+\\.(?:ts|tsx)$": [
      "ts-jest",
      {
        babelConfig: { plugins: ["babel-plugin-transform-vite-meta-env"] },
        diagnostics: false,
        isolatedModules: true,
        tsconfig: {
          jsx: "react"
        }
      }
    ]
  }
};

export default config;
