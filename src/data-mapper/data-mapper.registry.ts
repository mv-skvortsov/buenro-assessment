import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { DiscoveryService } from '@nestjs/core';

import { DataMapper } from '@/common';
import { DATA_MAPPER_KEY } from './decorators';

@Injectable()
export class DataMapperRegistry implements OnModuleInit {
  private readonly logger = new Logger(DataMapperRegistry.name);
  private readonly mappers = new Map<string, DataMapper>();
  constructor(private readonly discoveryService: DiscoveryService) {}

  onModuleInit() {
    const mappers = this.discoveryService
      .getProviders()
      .filter((mapper) => mapper.metatype && Reflect.getMetadata(DATA_MAPPER_KEY, mapper.metatype))
      .map((mapper) => ({
        instance: mapper.instance as DataMapper,
        type: Reflect.getMetadata(DATA_MAPPER_KEY, mapper.metatype!) as string,
      }));

    for (const mapper of mappers) {
      this.mappers.set(mapper.type, mapper.instance);
      this.logger.log(`Data mapper registered: ${mapper.type}`);
    }
  }

  get(type: string): DataMapper {
    if (this.mappers.has(type)) {
      return this.mappers.get(type)!;
    }

    throw new Error(`Data mapper not found for: ${type}`);
  }
}
