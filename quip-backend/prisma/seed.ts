import {
  PrismaClient,
  Ownership,
  FacilityLevel,
  OperationalStatus,
  RegistrationStatus,
  LicenseStatus,
} from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();
async function main() {
  await prisma.$connect();

  const data = [];

  Array.from('1111111111').forEach(() => {
    data.push({
      facilityCode: faker.string.uuid(),
      stateUniqueId: faker.string.uuid(),
      regNo: faker.string.uuid(),
      facilityName: faker.company.name(),
      alternateName: faker.company.name(),
      startDate: faker.date.past(),
      ownership: Ownership.PRIVATE,
      ownershipType: faker.string.uuid(),
      facilityLevel: FacilityLevel.PRIMARY,
      facilityLevelOption: faker.string.uuid(),
      daysOfOperation: [faker.date.weekday()],
      hoursOfOperation: [],
      state: faker.location.state(),
      lga: faker.location.county(),
      ward: faker.location.county(),
      physicalLocation: faker.location.city(),
      postalAddress: faker.location.zipCode(),
      longitude: faker.location.longitude(),
      latitude: faker.location.longitude(),
      phone: faker.phone.number(),
      alternatePhone: faker.phone.number(),
      email: `${faker.person.firstName()}@gmail.com`,
      website: faker.internet.domainName(),
      operationalStatus: OperationalStatus.Operational,
      registrationStatus: RegistrationStatus.Registered,
      licenseStatus: LicenseStatus.Licensed,
      inPatient: true,
      outPatient: true,
      medicalServices: [faker.string.alpha()],
      surgicalServices: [faker.string.alpha()],
      obstericsAndGynecologyServices: [faker.string.alpha()],
      pediatricsServices: [faker.string.alpha()],
      dentalServices: [faker.string.alpha()],
      specificServices: [faker.string.alpha()],
      numOfBeds: 1,
      onSiteLaboratory: true,
      onSiteImaging: true,
      onSitePharmacy: true,
      mortuaryServices: true,
      ambulanceServices: true,
      numOfDoctors: 1,
      numOfPharmacists: 1,
      numOfPharmacyTechnicians: 1,
      numOfDentists: 1,
      numOfDentalTechnicians: 1,
      numOfNurses: 1,
      numOfMidwifes: 1,
      numOfNursesOrMidwifes: 1,
      numOfLabTechnicians: 1,
      numOfLabScientits: 1,
      numOfHIMOfficers: 1,
      numOfCommunityHealthOfficers: 1,
      numOfCommunityHealthExtensionWorker: 1,
      numOfJuniorComHealthExtensionWorker: 1,
      numOfEnvironmentalHealthOfficers: 1,
      numOfHealthAssitant: 1,
    });
  });

  for (const item of data) {
    await prisma.healthcare.create({
      data: item,
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
