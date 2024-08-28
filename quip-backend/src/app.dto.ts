import { ApiProperty } from '@nestjs/swagger';
import {
  FacilityLevel,
  LicenseStatus,
  OperationalStatus,
  Ownership,
  RegistrationStatus,
} from '@prisma/client';
import { IsString, IsEnum, IsOptional } from 'class-validator';
import { PaginationQueryDto } from './common/dtos/query.dto';

export class FilterHospitalsDto extends PaginationQueryDto {
  @IsString()
  @IsOptional()
  @ApiProperty({
    required: false,
  })
  name: string;

  @IsEnum(Ownership)
  @IsOptional()
  @ApiProperty()
  ownership: Ownership;

  @IsEnum(OperationalStatus)
  @IsOptional()
  @ApiProperty()
  operationalStatus: OperationalStatus;

  @IsEnum(FacilityLevel)
  @IsOptional()
  @ApiProperty()
  facilityLevel: FacilityLevel;

  @IsEnum(LicenseStatus)
  @IsOptional()
  @ApiProperty()
  licenseStatus: LicenseStatus;

  @IsEnum(RegistrationStatus)
  @IsOptional()
  @ApiProperty()
  registrationStatus: RegistrationStatus;
}
