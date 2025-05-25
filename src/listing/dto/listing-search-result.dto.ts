import { ListingDto } from './listing.dto';

export class ListingSearchResultDto {
  total!: number;
  skip!: number;
  limit!: number;
  results!: ListingDto[];
}
