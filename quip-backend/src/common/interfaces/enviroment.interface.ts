export enum Environment {
  Development = 'development',
  Production = 'production',
  Local = 'local',
  Test = 'test',
}

export interface EnvironmentConfig {
  getEnvironment(): Environment;
  getAppName(): string;
  getSwaggerRoute(): string;
  getPort(): number;
}
