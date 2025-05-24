import { DataSource } from './data-source';

export interface DataPipe {
  name: string;
  source: DataSource;
  mapper: string;
  interval: number;
}
