import type {Config} from 'jest';

const config: Config = {
  collectCoverage: true,
  coverageProvider: "v8",
  testEnvironment: 'node',  
  preset: 'ts-jest'
};

export default config;
