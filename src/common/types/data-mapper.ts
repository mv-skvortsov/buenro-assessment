import { Listing } from './listing';

export interface DataMapper {
  toListing(params: { source: string; data: unknown }): Promise<Listing> | Listing | null;
}
