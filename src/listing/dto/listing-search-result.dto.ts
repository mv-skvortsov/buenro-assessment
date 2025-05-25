import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNumber, Min } from 'class-validator';
import { ListingDto } from './listing.dto';

export class ListingSearchResultDto {
  @ApiProperty({ description: 'Total number of matching records', example: 100 })
  @IsNumber()
  @Min(0)
  total!: number;

  @ApiProperty({ description: 'Number of records skipped', example: 0 })
  @IsNumber()
  @Min(0)
  skip!: number;

  @ApiProperty({ description: 'Number of records returned', example: 20 })
  @IsNumber()
  @Min(1)
  limit!: number;

  @ApiProperty({ description: 'Array of listings matching the query', type: [ListingDto] })
  @IsArray()
  results!: ListingDto[];
}
