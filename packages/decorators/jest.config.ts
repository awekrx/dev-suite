import type { Config } from 'jest';

/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */
const config: Config = {
  collectCoverageFrom: [
    '**/*.ts',
    '!**/*.spec.ts',
    '!**/types.ts',
    '!index.ts',
    '!core/decorators/**/index.ts',
    '!decorators/**/index.ts',
    '!core/types/**/*.ts',
    '!decorators/method/debug/core.ts',
  ],
  coverageDirectory: '../coverage',
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: 'src',
  testEnvironment: 'node',
  testRegex: '.*\\.spec\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  moduleNameMapper: {
    '^\\$core/(.*)$': '<rootDir>/core/$1',
    '^\\$decorators/(.*)$': '<rootDir>/decorators/$1',
    '^\\$types/(.*)$': '<rootDir>/core/types/$1',
    '^\\$utils/(.*)$': '<rootDir>/utils/$1',
  },
  passWithNoTests: true,
};

export default config;
