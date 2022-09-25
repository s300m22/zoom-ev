module.exports = {
  testEnvironment: 'jsdom',
  roots: ['<rootDir>'],
  preset: 'ts-jest',
  setupFilesAfterEnv: ['<rootDir>/test/setup.ts'],
  transform: {
    '^.+\\.(ts|tsx)?$': 'ts-jest',
    '^.+\\.svg$': '<rootDir>/jest-svg-transformer.js', // tmp fix as the current version of the jest-svg-transformer see https://github.com/cwmoo740/jest-svg-transformer/issues/3
  },
  testRegex: '((src|test)/(.+)\\.(test)).tsx?$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  testPathIgnorePatterns: ['<rootDir>/node_modules/'],
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/test/tsconfig.jest.json',
    },
  },
  modulePaths: ['<rootDir>/'],
  collectCoverageFrom: ['src/**/*.{js,ts,jsx,tsx}', '!**/node_modules/**', '!test/**'],
  coverageReporters: ['html', 'text'],
  coverageDirectory: '<rootDir>/coverage/',
};
