import { Module } from '@nestjs/common';
import { GeocodeService } from './geo.service';

@Module({
  providers: [GeocodeService],
  exports: [GeocodeService],
})
export class GeocodeServiceModule {}
