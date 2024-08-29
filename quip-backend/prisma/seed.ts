import {
  PrismaClient,
  Ownership,
  FacilityLevel,
  OperationalStatus,
  RegistrationStatus,
  LicenseStatus,
} from '@prisma/client';
import * as data101 from './data_101.json';
import * as data102 from './data_102.json';
import * as data103 from './data_103.json';
import * as data124 from './data_124.json';
import * as data128 from './data_128.json';
import * as data130 from './data_130.json';

const prisma = new PrismaClient();
async function main() {
  await prisma.$connect();

  const data = [];

  const dataImport = [
    data101,
    data102,
    data103,
    data124,
    data128,
    data130,
  ].reduce((acc, curr) => [...acc, ...curr], []);

  function getOwnership(v: string) {
    switch (v) {
      case 'Private':
        return Ownership.PRIVATE;
      case 'Public':
        return Ownership.PUBLIC;
      default:
        throw new Error(`Invalid ownership value: ${v}`);
    }
  }

  function getFacilityLevel(v: string) {
    switch (v) {
      case 'Primary':
        return FacilityLevel.PRIMARY;
      case 'Secondary':
        return FacilityLevel.SECONDARY;
      case 'Tertiary':
        return FacilityLevel.TERTIARY;
      default:
        throw new Error(`Invalid facility level value: ${v}`);
    }
  }

  function getOperationalStatus(v: string) {
    switch (v) {
      case 'Operational':
        return OperationalStatus.Operational;
      case 'Pending Operation':
        return OperationalStatus.PendingOperation;
      case 'Pending Operation (Construction Complete)':
        return OperationalStatus.PendingOperationButConstructed;
      case 'Pending Operation (Under Construction)':
        return OperationalStatus.PendingOperationUnderConstruction;
      case 'Closed':
        return OperationalStatus.Closed;
      case 'Closed (Temporary)':
        return OperationalStatus.ClosedTemporarily;
      default:
        throw new Error(`Invalid operational status value: ${v}`);
    }
  }

  function getRegStatus(v: string) {
    switch (v) {
      case 'Provisionally Registered':
        return RegistrationStatus.ProvisionallyRegistered;
      case 'Registered':
        return RegistrationStatus.Registered;
      case 'Registration Suspended':
        return RegistrationStatus.RegistrationSuspended;
      case 'Registration Cancelled':
        return RegistrationStatus.RegistrationCancelled;
      case 'Pending Registration':
        return RegistrationStatus.PendingRegistration;
      case 'Not Applicable':
        return RegistrationStatus.NotApplicable;
      case 'Unknown':
        return RegistrationStatus.Unknown;
      default:
        return RegistrationStatus.Unknown;
    }
  }

  function getLicenseStatus(v: string) {
    switch (v) {
      case 'Licensed':
        return LicenseStatus.Licensed;
      case 'Not Licensed':
        return LicenseStatus.NotLicensed;
      case 'License Cancelled':
        return LicenseStatus.LicenseCancelled;
      case 'Not Applicable':
        return LicenseStatus.NotApplicable;
      case 'Unknown':
        return LicenseStatus.Unknown;
      default:
        return LicenseStatus.Unknown;
    }
  }

  function getDaysOfWeek(v: string) {
    const days = v.split(',').map((day) => day.trim());
    return days;
  }

  function stringToBool(v: string) {
    switch (v) {
      case 'Yes':
        return true;
      case 'No':
        return false;
      default:
        return null;
    }
  }

  function stringToNum(v: string) {
    const num = parseInt(v, 10);
    return isNaN(num) ? null : num;
  }

  dataImport.forEach((item) => {
    data.push({
      facilityCode: item.facility_code,
      stateUniqueId: item.state_unique_id,
      regNo: item.registration_no,
      facilityName: item.facility_name,
      alternateName: item.alt_facility_name,
      startDate: item.start_date ? new Date(item.start_date) : null,
      ownership: getOwnership(item.ownership),
      ownershipType: item.ownership_type,
      facilityLevel: getFacilityLevel(item.facility_level),
      facilityLevelOption: '',
      daysOfOperation: getDaysOfWeek(item.operational_days),
      hoursOfOperation: [item.operational_hours],
      state: item.state,
      lga: item.lga,
      ward: item.ward,
      physicalLocation: item.physical_location,
      postalAddress: item.postal_address,
      longitude: item.longitude ? parseFloat(item.longitude) : null,
      latitude: item.longitude ? parseFloat(item.latitude) : null,
      phone: item.phone_number,
      alternatePhone: item.alternate_number,
      email: item.email_address,
      website: item.website,
      operationalStatus: getOperationalStatus(item.operation_status),
      registrationStatus: getRegStatus(item.registration_status),
      licenseStatus: getLicenseStatus(item.license_status),
      inPatient: stringToBool(item.inpatient),
      outPatient: stringToBool(item.outpatient),
      medicalServices: item.medical,
      surgicalServices: item.surgical,
      obstericsAndGynecologyServices: item.gyn,
      pediatricsServices: item.pediatrics,
      dentalServices: item.dental,
      specificServices: item.specialservice,
      numOfBeds: stringToNum(item.beds),
      onSiteLaboratory: stringToBool(item.onsite_laboratory),
      onSiteImaging: stringToBool(item.onsite_imaging),
      onSitePharmacy: stringToBool(item.onsite_pharmarcy),
      mortuaryServices: stringToBool(item.mortuary_services),
      ambulanceServices: stringToBool(item.ambulance_services),
      numOfDoctors: stringToNum(item.doctors),
      numOfPharmacists: stringToNum(item.pharmacists),
      numOfPharmacyTechnicians: stringToNum(item.pharmacy_technicians),
      numOfDentists: stringToNum(item.dentist),
      numOfDentalTechnicians: stringToNum(item.dental_technicians),
      numOfNurses: stringToNum(item.nurses),
      numOfMidwifes: stringToNum(item.midwifes),
      numOfNursesOrMidwifes: stringToNum(item.nurse_midwife),
      numOfLabTechnicians: stringToNum(item.lab_technicians),
      numOfLabScientits: stringToNum(item.lab_scientists),
      numOfHIMOfficers: stringToNum(item.him_officers),
      numOfCommunityHealthOfficers: stringToNum(item.community_health_officer),
      numOfCommunityHealthExtensionWorker: stringToNum(
        item.community_extension_workers,
      ),
      numOfJuniorComHealthExtensionWorker: stringToNum(
        item.jun_community_extension_worker,
      ),
      numOfEnvironmentalHealthOfficers: stringToNum(item.env_health_officers),
      numOfHealthAssitant: stringToNum(item.attendants),
    });
  });

  for (const item of data) {
    await prisma.healthcare.upsert({
      where: {
        facilityCode: item.facilityCode,
      },
      update: item,
      create: item,
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
