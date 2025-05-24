import { Injectable } from '@nestjs/common';
import { Readable } from 'stream';
import axios from 'axios';

import { DataFetcher, DataSource } from '@/common';
import { SourceFetcher } from '../decorators';

@Injectable()
@SourceFetcher('url')
export class UrlFetcher implements DataFetcher {
  async getStream(source: DataSource): Promise<Readable> {
    const response = await axios.get(source.url, { responseType: 'stream' });
    return response.data as Readable;
  }
}
