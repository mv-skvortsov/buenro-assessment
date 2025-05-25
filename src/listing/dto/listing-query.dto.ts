import { IsOptional, IsString, IsBoolean, IsNumber, IsArray, IsIn, Min } from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { PriceSegment } from '@/common';

export class ListingQueryDto {
  @ApiPropertyOptional({ description: 'Filter by name (partial text match)' })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({ description: 'Filter by city (partial text match)' })
  @IsOptional()
  @IsString()
  city?: string;

  @ApiPropertyOptional({ description: 'Filter by country (partial text match)' })
  @IsOptional()
  @IsString()
  country?: string;

  @ApiPropertyOptional({ description: 'Filter by availability (true or false)', type: Boolean })
  @IsOptional()
  @Type(() => Boolean)
  @IsBoolean()
  availability?: boolean;

  @ApiPropertyOptional({ description: 'Minimum price per night', type: Number })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  minPrice?: number;

  @ApiPropertyOptional({ description: 'Maximum price per night', type: Number })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  maxPrice?: number;

  @ApiPropertyOptional({
    description: 'Filter by one or more price segments',
    isArray: true,
    enum: PriceSegment,
  })
  @IsOptional()
  @Transform(({ value }) => {
    if (value === undefined || value === null) {
      return undefined;
    }
    if (Array.isArray(value)) {
      return value.map(String);
    }
    return [String(value)];
  })
  @IsArray()
  @IsIn([PriceSegment.Low, PriceSegment.Medium, PriceSegment.High], { each: true })
  priceSegment?: PriceSegment[];

  @ApiPropertyOptional({
    description: 'Number of records to skip for pagination',
    type: Number,
    default: 0,
    minimum: 0,
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  skip: number = 0;

  @ApiPropertyOptional({
    description: 'Number of records to return for pagination',
    type: Number,
    default: 20,
    minimum: 1,
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  limit: number = 20;
}
