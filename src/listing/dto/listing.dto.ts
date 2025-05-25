import { PriceSegment } from '@/common';

export class ListingDto {
  name?: string;
  city?: string;
  country?: string;
  availability?: boolean;
  pricePerNight?: number;
  priceSegment?: PriceSegment;
}
