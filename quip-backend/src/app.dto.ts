import { ApiProperty } from '@nestjs/swagger';
import {
  FacilityLevel,
  LicenseStatus,
  OperationalStatus,
  Ownership,
  RegistrationStatus,
} from '@prisma/client';
import { IsString, IsEnum, IsOptional, IsNumber } from 'class-validator';
import { PaginationQueryDto } from './common/dtos/query.dto';

export class FilterHospitalsDto extends PaginationQueryDto {
  @IsString()
  @IsOptional()
  @ApiProperty({
    required: false,
  })
  name: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    required: false,
  })
  state?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    required: false,
  })
  lga?: string;

  @IsNumber()
  @IsOptional()
  @ApiProperty({
    required: false,
  })
  longitude: number;

  @IsNumber()
  @IsOptional()
  @ApiProperty({
    required: false,
  })
  latitude: number;

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
