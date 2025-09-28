module.exports = {
  moduleFileExtensions: ['js'],
  transform: {
    '^.+\\.(js)$': 'babel-jest',
  },
  testEnvironment: 'jest-environment-jsdom',
  transformIgnorePatterns: ['/node_modules/'],
  moduleNameMapper: {
    '\\.(css|less)$': '<rootDir>/__mocks__/styleMock.cjs',
  },
  setupFilesAfterEnv: ['<rootDir>/setupTests.js'],
};
