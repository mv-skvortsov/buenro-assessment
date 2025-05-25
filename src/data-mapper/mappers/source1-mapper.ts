import { Injectable } from '@nestjs/common';

import { DataMapper, Listing } from '@/common';
import { ListingMapper } from '../decorators';
import { Source1 } from '../types';

@Injectable()
@ListingMapper('source1')
export class Source1Mapper implements DataMapper {
  toListing({ source, data }: { source: string; data: unknown }): Promise<Listing> | Listing | null {
    const typed = data as Source1;
    return {
      source,
      originalId: String(typed.id),
      name: typed.name,
      availability: typed.isAvailable,
      pricePerNight: typed.priceForNight,
      country: typed.address.country,
      city: typed.address.city,
    };
  }
}
