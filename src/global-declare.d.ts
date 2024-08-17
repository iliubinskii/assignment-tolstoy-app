/* eslint import/no-extraneous-dependencies: ["warn", { "devDependencies": true }] -- Ok */

import type { TestingLibraryMatchers } from "@testing-library/jest-dom/matchers";
import type { expect } from "@jest/globals";
import type jestExtended from "jest-extended";

type JestExtended = typeof jestExtended;

declare module "@jest/expect" {
  export interface Matchers<R>
    extends JestExtended,
      TestingLibraryMatchers<typeof expect.stringContaining, R> {}
}
