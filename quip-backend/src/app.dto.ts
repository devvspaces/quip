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
import { Transform } from 'class-transformer';

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
    description:
      'Search for healthcare facilities using a natural language query. e.g. "I am having stomach pain". These allows the platform to search for only facilities that offer the services you will require',
    example: 'I am having stomach pain',
  })
  smartSearch: string;

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
  @Transform(({ value }) => parseFloat(value))
  longitude: number;

  @IsNumber()
  @IsOptional()
  @ApiProperty({
    required: false,
  })
  @Transform(({ value }) => parseFloat(value))
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

export class ClassifyDto {
  @IsString()
  @ApiProperty()
  message: string;
}
