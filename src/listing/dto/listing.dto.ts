import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsBoolean, IsNumber } from 'class-validator';
import { PriceSegment } from '@/common';

export class ListingDto {
  @ApiPropertyOptional({ description: 'Name of the listing', example: 'Cozy Apartment' })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({ description: 'City where the listing is located', example: 'Paris' })
  @IsString()
  city!: string;

  @ApiPropertyOptional({ description: 'Country where the listing is located', example: 'France' })
  @IsOptional()
  @IsString()
  country?: string;

  @ApiProperty({ description: 'Availability status of the listing', example: true })
  @IsBoolean()
  availability!: boolean;

  @ApiProperty({ description: 'Price per night', example: 150 })
  @IsNumber()
  pricePerNight!: number;

  @ApiPropertyOptional({
    description: 'Price segment of the listing',
    enum: PriceSegment,
    example: PriceSegment.Medium,
  })
  @IsOptional()
  priceSegment?: PriceSegment;
}
