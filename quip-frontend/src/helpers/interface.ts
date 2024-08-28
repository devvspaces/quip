function enumToArray(v: any) {
  return Object.values(v).filter((e) => typeof e === 'string');
}

// enums
export enum Ownership {
  PUBLIC,
  PRIVATE,
}

export enum OperationalStatus {
  Operational,
  PendingOperation,
  PendingOperationButConstructed,
  PendingOperationUnderConstruction,
  Closed,
  ClosedTemporarily,
}

export enum FacilityLevel {
  PRIMARY,
  SECONDARY,
  TERTIARY,
}

export enum LicenseStatus {
  Licensed,
  NotLicensed,
  LicenseCancelled,
  NotApplicable,
  Unknown,
}

export enum RegistrationStatus {
  ProvisionallyRegistered,
  Registered,
  RegistrationSuspended,
  RegistrationCancelled,
  PendingRegistration,
  NotApplicable,
  Unknown,
}

export const OwnershipObj = enumToArray(Ownership);
export const FacilityLevelObj = enumToArray(FacilityLevel);
export const RegistrationStatusObj = enumToArray(RegistrationStatus);
export const OperationalStatusObj = enumToArray(OperationalStatus);
export const LicenseStatusObj = enumToArray(LicenseStatus);

// Healthcare type
interface Healthcare {
  id: string;
  facilityCode: string;
  stateUniqueId?: string;
  regNo?: string;
  facilityName: string;
  alternateName?: string;
  startDate?: string;
  ownership: string;
  ownershipType?: string;
  facilityLevel: string;
  facilityLevelOption?: string;
  daysOfOperation: string[];
  hoursOfOperation: string[];

  // Location data
  state: string;
  lga: string;
  ward?: string;
  physicalLocation?: string;
  postalAddress?: string;
  longitude?: number;
  latitude?: number;

  // Contact
  phone?: string;
  alternatePhone?: string;
  email?: string;
  website?: string;

  // Status
  operationalStatus: string;
  registrationStatus: string;
  licenseStatus: string;

  // Services
  inPatient?: boolean;
  outPatient?: boolean;
  medicalServices: string[];
  surgicalServices: string[];
  obstericsAndGynecologyServices: string[];
  pediatricsServices: string[];
  dentalServices: string[];
  specificServices: string[];
  numOfBeds: number;
  onSiteLaboratory?: boolean;
  onSiteImaging?: boolean;
  onSitePharmacy?: boolean;
  mortuaryServices?: boolean;
  ambulanceServices?: boolean;

  // Staff
  numOfDoctors?: number;
  numOfPharmacists?: number;
  numOfPharmacyTechnicians?: number;
  numOfDentists?: number;
  numOfDentalTechnicians?: number;
  numOfNurses?: number;
  numOfMidwifes?: number;
  numOfNursesOrMidwifes?: number;
  numOfLabTechnicians?: number;
  numOfLabScientits?: number;
  numOfHIMOfficers?: number;
  numOfCommunityHealthOfficers?: number;
  numOfCommunityHealthExtensionWorker?: number;
  numOfJuniorComHealthExtensionWorker?: number;
  numOfEnvironmentalHealthOfficers?: number;
  numOfHealthAssitant?: number;
  distance?: number;
}

export default Healthcare;