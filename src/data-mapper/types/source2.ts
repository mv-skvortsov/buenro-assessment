import { PriceSegment } from '@/common';

export interface Source2 {
  id: string;
  city: string;
  availability: boolean;
  priceSegment: PriceSegment;
  pricePerNight: number;
}
