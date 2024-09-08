import type {Config} from 'jest';

const config: Config = {
  collectCoverage: true,
  coverageProvider: "v8",
  preset: 'ts-node'
};

export default config;
