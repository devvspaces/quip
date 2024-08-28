-- CreateEnum
CREATE TYPE "Ownership" AS ENUM ('PUBLIC', 'PRIVATE');

-- CreateEnum
CREATE TYPE "OperationalStatus" AS ENUM ('Operational', 'PendingOperation', 'PendingOperationButConstructed', 'PendingOperationUnderConstruction', 'Closed', 'ClosedTemporarily');

-- CreateEnum
CREATE TYPE "FacilityLevel" AS ENUM ('PRIMARY', 'SECONDARY', 'TERTIARY');

-- CreateEnum
CREATE TYPE "LicenseStatus" AS ENUM ('Licensed', 'NotLicensed', 'LicenseCancelled', 'NotApplicable', 'Unknown');

-- CreateEnum
CREATE TYPE "RegistrationStatus" AS ENUM ('ProvisionallyRegistered', 'Registered', 'RegistrationSuspended', 'RegistrationCancelled', 'PendingRegistration', 'NotApplicable', 'Unknown');

-- CreateTable
CREATE TABLE "Healthcare" (
    "id" TEXT NOT NULL,
    "facility_code" TEXT NOT NULL,
    "state_unique_id" TEXT,
    "reg_no" TEXT,
    "facility_name" TEXT NOT NULL,
    "alternateName" TEXT,
    "start_date" TIMESTAMP(3),
    "ownership" "Ownership" NOT NULL,
    "ownership_type" TEXT,
    "facility_level" "FacilityLevel" NOT NULL,
    "facility_level_option" TEXT,
    "days_of_operation" TEXT[],
    "hours_of_operation" TEXT[],
    "state" TEXT NOT NULL,
    "lga" TEXT NOT NULL,
    "ward" TEXT,
    "physical_location" TEXT,
    "postal_address" TEXT,
    "longitude" INTEGER,
    "latitude" INTEGER,
    "phone" TEXT,
    "alternate_phone" TEXT,
    "email" TEXT,
    "website" TEXT,
    "operational_status" "OperationalStatus" NOT NULL,
    "registration_status" "RegistrationStatus" NOT NULL,
    "license_status" "LicenseStatus" NOT NULL,
    "inPatient" BOOLEAN,
    "outPatient" BOOLEAN,
    "medical_services" TEXT[],
    "surgical_services" TEXT[],
    " obsterics_and_gynecology_services" TEXT[],
    "pediatrics_services" TEXT[],
    "dental_services" TEXT[],
    "specific_services" TEXT[],
    "num_of_beds" INTEGER NOT NULL,
    "onsite_laboratory" BOOLEAN,
    "onsite_imaging" BOOLEAN,
    "onsite_pharmacy" BOOLEAN,
    "mortuary_services" BOOLEAN,
    "ambulance_services" BOOLEAN,
    "num_of_doctors" INTEGER,
    "num_of_pharmacists" INTEGER,
    "num_of_pharmacy_technicians" INTEGER,
    "num_of_dentists" INTEGER,
    "num_of_dental_technicians" INTEGER,
    "num_of_nurses" INTEGER,
    "num_of_midwifes" INTEGER,
    "num_of_nurses_or_midwifes" INTEGER,
    "num_of_lab_technicians" INTEGER,
    "num_of_lab_scientits" INTEGER,
    "num_of_him_officers" INTEGER,
    "num_of_community_health_officers" INTEGER,
    "num_of_community_health_extension_worker" INTEGER,
    "num_of_junior_com_health_extension_worker" INTEGER,
    "num_of_environmental_health_officers" INTEGER,
    "num_of_health_assitant" INTEGER,

    CONSTRAINT "Healthcare_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Healthcare_facility_code_key" ON "Healthcare"("facility_code");

-- CreateIndex
CREATE UNIQUE INDEX "Healthcare_alternateName_key" ON "Healthcare"("alternateName");
