import { Injectable } from '@nestjs/common';
import { FilterHospitalsDto } from './app.dto';
import { PrismaService } from './config/prisma/prisma.service';
import { calculateDistanceInMiles } from './common/helpers/distance';
import { GeocodeService } from './services/geocode/geo.service';

@Injectable()
export class AppService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly geocodeService: GeocodeService,
  ) {}
  async findHospitals(query: FilterHospitalsDto) {
    if (query.longitude && query.latitude) {
      if (!query.state && !query.lga) {
        const revGeo = await this.geocodeService.getAddress(
          query.latitude,
          query.longitude,
        );
        query.state = revGeo.address.state;
        query.lga = revGeo.address.county;
      }
    }

    const filter = {
      facilityName: query.name && {
        contains: query.name,
      },
      ownership: query.ownership,
      operationalStatus: query.operationalStatus,
      facilityLevel: query.facilityLevel,
      licenseStatus: query.licenseStatus,
      registrationStatus: query.registrationStatus,
      OR: [
        {
          state: query.state,
        },
        {
          lga: query.lga,
        },
      ],
    };
    const count = await this.prismaService.healthcare.count({ where: filter });
    let results = await this.prismaService.healthcare.findMany({
      where: filter,
      take: query.take,
      skip: query.skip,
    });

    if (query.latitude && query.longitude) {
      const newResults = results.map((facility) => {
        const newFacility = {
          ...facility,
          distance: null,
        };
        if (facility.latitude && facility.longitude) {
          const distance = calculateDistanceInMiles(
            query.latitude,
            query.longitude,
            facility.latitude,
            facility.longitude,
          );
          newFacility.distance = distance;
        }
        return newFacility;
      });
      // Sort by distance if available
      results = newResults.sort((a, b) => {
        if (a.distance && b.distance) {
          return a.distance - b.distance;
        }
        return 0;
      });
    }
    return { count, results };
  }
}
