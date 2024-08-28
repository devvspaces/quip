import { Injectable } from '@nestjs/common';
import { FilterHospitalsDto } from './app.dto';
import { PrismaService } from './config/prisma/prisma.service';

@Injectable()
export class AppService {
  constructor(private readonly prismaService: PrismaService) {}
  async findHospitals(query: FilterHospitalsDto) {
    const filter = {
      facilityName: query.name && {
        contains: query.name,
      },
      ownership: query.ownership,
      operationalStatus: query.operationalStatus,
      facilityLevel: query.facilityLevel,
      licenseStatus: query.licenseStatus,
      registrationStatus: query.registrationStatus,
    };
    const count = await this.prismaService.healthcare.count({ where: filter });
    const results = await this.prismaService.healthcare.findMany({
      where: filter,
      take: query.take,
      skip: query.skip,
    });
    return { count, results };
  }
}
