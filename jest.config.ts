import type { Config } from "@jest/types";

const config: Config.InitialOptions = {
  preset: "ts-jest",
  testEnvironment: "node",
  maxWorkers: "50%",
  passWithNoTests: false,
  forceExit: false,
  modulePathIgnorePatterns: ["dist/", "__tests__/init.ts"],
  testTimeout: 5000,
  globalSetup: "<rootDir>/__tests__/init.ts"
};

export default config;
