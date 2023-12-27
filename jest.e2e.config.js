/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  // preset: 'jest-expo',
  testEnvironment: 'node',
  testRegex: 'e2e\\.test\\.ts$',
  setupFiles: [
    "<rootDir>/jest/setup.e2e.js"
  ],
  transformIgnorePatterns: [
    "node_modules/(?!(jest-)?@react-native|react-native|react-native-elements|@rneui|@expo|expo-font|expo-modules-core|expo-asset|expo/*)"
  ],
};