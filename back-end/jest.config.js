/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  clearMocks: true,
  testEnvironment: "node",
  transform: {
    "^.+\\.ts$": "ts-jest"
  },
  testRegex: ".test.ts",
  coverageProvider: "v8",
  moduleFileExtensions: ["js", "jsx", "ts", "tsx", "json", "node"],
  roots: ["../back-end/tests"],
};