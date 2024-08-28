import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { BadRequestException, Logger, ValidationPipe } from '@nestjs/common';
import * as bodyParser from 'body-parser';
import { SwaggerInit } from './common/swagger/swagger';
import { EnvironmentConfigService } from './config/environment-config/environment-config.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { rawBody: true });

  app.enableCors({ origin: '*' });

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      stopAtFirstError: true,
      errorHttpStatusCode: 400,
      exceptionFactory: (errors) => new BadRequestException(errors),
    }),
  );

  const MAX_BODY_SIZE = '10mb';
  app.use(bodyParser.json({ limit: MAX_BODY_SIZE }));
  app.use(bodyParser.urlencoded({ limit: MAX_BODY_SIZE, extended: true }));

  SwaggerInit(app, [AppModule]);

  const configService = app.get(EnvironmentConfigService);

  const PORT = configService.getPort();
  await app.listen(PORT);

  const appUrl = await app.getUrl();

  Logger.log(`app is running on ${appUrl}`, 'NestApplication');
}

bootstrap();
