import { Module } from '@nestjs/common';
import { DiscoveryModule } from '@nestjs/core';

import { DataFetcherRegistry } from './data-fetcher.registry';
import { UrlFetcher } from './fetchers';

@Module({
  imports: [DiscoveryModule],
  providers: [DataFetcherRegistry, UrlFetcher],
  exports: [DataFetcherRegistry],
})
export class DataFetcherModule {}
