import type { Config } from "@jest/types";

const config: Config.InitialOptions = {
  preset: "ts-jest",
  testEnvironment: "node",
  maxWorkers: "50%",
  passWithNoTests: false,
  forceExit: false,
  modulePathIgnorePatterns: ["dist/"],
  testTimeout: 5000
};

export default config;
