module.exports = {
  // The root directory that Jest should scan for tests and modules within
  rootDir: './',

  // The test environment that Jest should use for running tests
  testEnvironment: 'jsdom',

  // The file extensions that Jest should look for when running tests
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],

  // The pattern that Jest should use to search for test files
  testMatch: ['<rootDir>/src/**/__tests__/**/*.{js,jsx,ts,tsx}', '<rootDir>/src/**/*.{spec,test}.{js,jsx,ts,tsx}'],

  // The list of paths to directories that Jest should use to search for test files
  testPathIgnorePatterns: ['<rootDir>/node_modules/'],

  // The list of paths to directories that Jest should use to search for modules
  moduleDirectories: ['node_modules'],

  // The transform settings that Jest should use for different file types
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
  },

  // Any additional libraries or frameworks that Jest should use for testing
  setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'],

  // A map of global variables that should be available in all test files
  globals: {
    NODE_ENV: 'test',
  },
};
