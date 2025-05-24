import { Listing } from './listing';

export interface DataMapper {
  toListing(data: unknown): Promise<Listing> | Listing | null;
}
