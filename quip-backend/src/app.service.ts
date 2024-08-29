import { Injectable } from '@nestjs/common';
import { FilterHospitalsDto } from './app.dto';
import { PrismaService } from './config/prisma/prisma.service';
import { calculateDistanceInMiles } from './common/helpers/distance';
import { GeocodeService } from './services/geocode/geo.service';
import { BedrockService } from './services/aws-bedrock/bedrock.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class AppService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly geocodeService: GeocodeService,
    private readonly bedrockService: BedrockService,
  ) {}
  async findHospitals(query: FilterHospitalsDto) {
    if (query.longitude && query.latitude) {
      if (!query.state && !query.lga) {
        const revGeo = await this.geocodeService.getAddress(
          query.latitude,
          query.longitude,
        );
        query.state = revGeo.address.state;
        query.lga = revGeo.address.city;
      }
    }

    const services: string[] = [];
    if (query.smartSearch) {
      const { classes } = await this.classifyMessage(query.smartSearch);
      services.push(...classes);
    }

    const filter: Prisma.HealthcareWhereInput = {
      facilityName: query.name && {
        contains: query.name,
      },
      ownership: query.ownership,
      operationalStatus: query.operationalStatus,
      facilityLevel: query.facilityLevel,
      licenseStatus: query.licenseStatus,
      registrationStatus: query.registrationStatus,
      AND: [
        {
          OR: [
            ...(query.state || query.lga
              ? [
                  {
                    state: query.state,
                  },
                  {
                    lga: query.lga,
                  },
                ]
              : []),
          ],
        },
        {
          OR: [
            ...(services.length
              ? [
                  {
                    medicalServices: {
                      hasSome: services,
                    },
                  },
                  {
                    obstericsAndGynecologyServices: {
                      hasSome: services,
                    },
                  },
                  {
                    specificServices: {
                      hasSome: services,
                    },
                  },
                  {
                    dentalServices: {
                      hasSome: services,
                    },
                  },
                  {
                    surgicalServices: {
                      hasSome: services,
                    },
                  },
                  {
                    pediatricsServices: {
                      hasSome: services,
                    },
                  },
                ]
              : []),
          ],
        },
      ],
    };
    const count = await this.prismaService.healthcare.count({ where: filter });
    let results = await this.prismaService.healthcare.findMany({
      where: filter,
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

    results = results.slice(query.skip, query.skip + query.take);
    return { count, results };
  }
  async classifyMessage(message: string): Promise<{
    classes: string[];
  }> {
    const services = [
      'Gastroenterology',
      'Hematology',
      'General Surgery',
      'Anesthesia',
      'Pediatric Surgery',
      'Obstetrics',
      'Gynecology',
      'Fertility/Assisted Reproductive Techniques',
      'Nephrology',
      'Oncology',
      'Endocrinology',
      'Antenatal Care (ANC)',
      'Immunization',
      'HIV/ AIDS Services',
      'Non Communicable Diseases',
      'Family Planning',
      'Intensive Care Services',
      'Communicable Diseases',
      'Hepatitis',
      'Accidents and Emergency',
      'Nutrition',
      'Health Education and Community Mobilization',
      'Maternal and newborn care',
      'Pulmonology',
      'Neonatology',
      'Child Survival',
      'Geriatrics',
      'Neurology',
      'Infectious Diseases',
      'Tuberculosis',
      'Nuclear Medicine',
      'Neuro-Surgery',
      'Urology',
      'Oncology/ Radiotherapy',
      'Radiology',
      'Child Psychiatry/ Behavioral Medicine',
      'Cardiology',
      'Dermatology',
      'Pathology',
      'Psychiatry/Behavioral Medicine',
      'Ophthalmology',
      'Orthopedic Surgery',
      'Otorhinolaryngology (ENT)',
      'Plastic Surgery',
      'Family Medicine',
      'Oral and Maxillo-Facial Surgery',
      'Periodontics',
      'Scanning',
      'Cardiothoracic Surgery',
      'Vascular Surgery',
    ];

    const prompt = `
    Classify this message
    "${message}"
    into one of more of the following healthcare services
    ${services}
    , and your response must only be in this JSON format { classes: [list of classes in strings]}. just the json nothing else
    `;

    return this.bedrockService.askAi(prompt);
  }
}
