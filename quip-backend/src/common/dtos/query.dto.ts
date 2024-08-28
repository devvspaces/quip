import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';

export class PaginationQueryDto {
  @IsNumber()
  @ApiProperty({
    description: 'The number of items to skip',
    example: 3,
    required: false,
    default: 0,
  })
  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  skip?: number;

  @IsNumber()
  @ApiProperty({
    description: 'The number of items to take',
    example: 10,
    required: false,
    default: 10,
  })
  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  take?: number;
}
