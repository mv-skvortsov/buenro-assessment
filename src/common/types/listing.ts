import { PriceSegment } from '../enums';

export interface Listing {
  source: string;
  originalId: string;

  name?: string;
  city: string;
  country?: string;
  availability: boolean;
  pricePerNight: number;
  priceSegment?: PriceSegment;
}
