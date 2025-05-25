import { IsOptional, IsString, IsBoolean, IsNumber, IsArray, IsIn, Min } from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { PriceSegment } from '@/common';

export class ListingQueryDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  city?: string;

  @IsOptional()
  @IsString()
  country?: string;

  @IsOptional()
  @Type(() => Boolean)
  @IsBoolean()
  availability?: boolean;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  minPrice?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  maxPrice?: number;

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

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  skip: number = 0;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  limit: number = 20;
}
