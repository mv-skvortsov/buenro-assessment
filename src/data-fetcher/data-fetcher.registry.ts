import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { DiscoveryService } from '@nestjs/core';

import { DataFetcher } from '@/common';
import { DATA_FETCHER_KEY } from './decorators';

@Injectable()
export class DataFetcherRegistry implements OnModuleInit {
  private readonly logger = new Logger(DataFetcherRegistry.name);
  private readonly fetchers = new Map<string, DataFetcher>();
  constructor(private readonly discoveryService: DiscoveryService) {}

  onModuleInit() {
    const fetchers = this.discoveryService
      .getProviders()
      .filter((fetcher) => fetcher.metatype && Reflect.getMetadata(DATA_FETCHER_KEY, fetcher.metatype))
      .map((fetcher) => ({
        instance: fetcher.instance as DataFetcher,
        type: Reflect.getMetadata(DATA_FETCHER_KEY, fetcher.metatype!) as string,
      }));

    for (const fetcher of fetchers) {
      this.fetchers.set(fetcher.type, fetcher.instance);
      this.logger.log(`Data fetcher registered: ${fetcher.type}`);
    }
  }

  get(type: string): DataFetcher {
    if (this.fetchers.has(type)) {
      return this.fetchers.get(type)!;
    }

    throw new Error(`Data fetcher not found for: ${type}`);
  }
}
