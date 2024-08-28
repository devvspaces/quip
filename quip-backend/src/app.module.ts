import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AllExceptionFilter } from './common/filter/exception.filter';
import { EnvironmentConfigModule } from './config/environment-config/environment-config.module';
import { DatabaseModule } from './config/prisma/prisma.module';
import { GeocodeServiceModule } from './services/geocode/geo.module';

@Module({
  imports: [EnvironmentConfigModule, DatabaseModule, GeocodeServiceModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: AllExceptionFilter,
    },
  ],
})
export class AppModule {}
