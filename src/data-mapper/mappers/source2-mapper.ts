import { Injectable } from '@nestjs/common';

import { DataMapper, Listing } from '@/common';
import { ListingMapper } from '../decorators';
import { Source2 } from '../types';

@Injectable()
@ListingMapper('source2')
export class Source2Mapper implements DataMapper {
  toListing({ source, data }: { source: string; data: unknown }): Promise<Listing> | Listing | null {
    const typed = data as Source2;
    return {
      source,
      originalId: typed.id,
      city: typed.city,
      availability: typed.availability,
      pricePerNight: typed.pricePerNight,
      priceSegment: typed.priceSegment,
    };
  }
}
