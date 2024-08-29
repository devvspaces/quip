import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  Environment,
  EnvironmentConfig,
} from 'src/common/interfaces/enviroment.interface';
@Injectable()
export class EnvironmentConfigService implements EnvironmentConfig {
  constructor(private configService: ConfigService) {}

  getEnvironment(): Environment {
    return this.configService.get<Environment>('NODE_ENV');
  }

  getAppName(): string {
    return this.configService.get<string>('APP_NAME');
  }

  getPort(): number {
    return this.configService.get<number>('PORT');
  }

  getSwaggerRoute(): string {
    return this.configService.get<string>('SWAGGER_ROUTE');
  }

  getAwsAccessKey(): string {
    return this.configService.get<string>('AWS_ACCESS_KEY');
  }

  getAwsSecretKey(): string {
    return this.configService.get<string>('AWS_SECRET_ACCESS_KEY');
  }
}
