import { Injectable } from '@nestjs/common';

import { DataMapper, Listing } from '@/common';
import { ListingMapper } from '../decorators';

@Injectable()
@ListingMapper('source1')
export class Source1Mapper implements DataMapper {
  toListing(data: unknown): Promise<Listing> | Listing | null {
    return data !== null && typeof data === 'object' && 'id' in data ? { id: data.id as string } : null;
  }
}
