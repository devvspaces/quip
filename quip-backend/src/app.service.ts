import { Injectable } from '@nestjs/common';
import { FilterHospitalsDto } from './app.dto';
import { PrismaService } from './config/prisma/prisma.service';

@Injectable()
export class AppService {
  constructor(private readonly prismaService: PrismaService) {}
  findHospitals(query: FilterHospitalsDto) {
    return this.prismaService.healthcare.findMany({
      where: {
        facilityName: query.name && {
          contains: query.name,
          mode: 'insensitive',
        },
        ownership: query.ownership,
        operationalStatus: query.operationalStatus,
        facilityLevel: query.facilityLevel,
        licenseStatus: query.licenseStatus,
        registrationStatus: query.registrationStatus,
      },
    });
  }
}
