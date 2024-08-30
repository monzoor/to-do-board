const nextJest = require("next/jest");

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: "./",
});

// Add any custom config to be passed to Jest
const customJestConfig = {
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  testEnvironment: "jsdom",
  coverageProvider: "v8",
  collectCoverageFrom: [
    "src/app-api/**/!(*.d).ts",
    "src/helpers/**/!(*.d).ts",
    "src/hooks/**/!(*.d).ts",
    "src/utils/**/!(*.d).ts",
    "!src/**/index.ts",
    "!src/app-api/types/**",
    "!src/hooks/types/**",
  ],
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(customJestConfig);
