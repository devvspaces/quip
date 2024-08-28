import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  HttpCode,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { AppService } from './app.service';
import {
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import {
  FacilityLevel,
  LicenseStatus,
  OperationalStatus,
  Ownership,
  RegistrationStatus,
} from '@prisma/client';
import { FilterHospitalsDto } from './app.dto';
import { paginate } from './common/helpers/pagination';

@Controller('facilities')
@ApiTags('Base')
@UseInterceptors(ClassSerializerInterceptor)
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiOperation({
    summary: 'Find nearby healthcare providers',
    description: 'Use this route to get find healthcare providers',
  })
  @ApiOkResponse({
    description: 'Healthcare providers were retrieved successfully',
  })
  @HttpCode(200)
  @ApiQuery({
    name: 'ownership',
    enum: Ownership,
    required: false,
  })
  @ApiQuery({
    name: 'operationalStatus',
    enum: OperationalStatus,
    required: false,
  })
  @ApiQuery({
    name: 'facilityLevel',
    enum: FacilityLevel,
    required: false,
  })
  @ApiQuery({
    name: 'licenseStatus',
    enum: LicenseStatus,
    required: false,
  })
  @ApiQuery({
    name: 'registrationStatus',
    enum: RegistrationStatus,
    required: false,
  })
  async findHospitals(@Query() query: FilterHospitalsDto) {
    const { results, count } = await this.appService.findHospitals(query);
    return paginate(count, query.take, query.skip, results);
  }
}
