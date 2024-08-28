import { INestApplication, Logger } from '@nestjs/common';
import {
  DocumentBuilder,
  SwaggerCustomOptions,
  SwaggerModule,
} from '@nestjs/swagger';
import { EnvironmentConfigService } from 'src/config/environment-config/environment-config.service';

// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
export function SwaggerInit(app: INestApplication, modules?: Function[]) {
  const configService = app.get(EnvironmentConfigService);

  const NODE_ENV = configService.getEnvironment();

  const APP_NAME = configService.getAppName();

  const config = new DocumentBuilder()
    .addBearerAuth()
    .setTitle(APP_NAME)
    .setDescription('API documentation')
    .setVersion('1.0')
    .addTag('Api')
    .build();

  const customOptions: SwaggerCustomOptions = {
    swaggerOptions: {
      persistAuthorization: true,
    },
    customSiteTitle: APP_NAME,
    useGlobalPrefix: false,
  };

  const document = SwaggerModule.createDocument(app, config, {
    include: modules,
    operationIdFactory: (_controllerKey, methodKey) => methodKey,
  });
  const swaggerRoute = configService.getSwaggerRoute();

  if (NODE_ENV != 'development') {
    app.use(swaggerRoute);
  }
  SwaggerModule.setup(swaggerRoute, app, document, customOptions);

  const logger = new Logger('Swagger');
  logger.log(`Swagger is running on ${swaggerRoute}`);
}
