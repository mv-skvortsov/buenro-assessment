import { Readable } from 'stream';
import { DataSource } from './data-source';

export interface DataFetcher {
  getStream(source: DataSource): Promise<Readable>;
}
