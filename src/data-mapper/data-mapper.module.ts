import { Module } from '@nestjs/common';
import { DiscoveryModule } from '@nestjs/core';

import { DataMapperRegistry } from './data-mapper.registry';
import { Source1Mapper, Source2Mapper } from './mappers';

@Module({
  imports: [DiscoveryModule],
  providers: [DataMapperRegistry, Source1Mapper, Source2Mapper],
  exports: [DataMapperRegistry],
})
export class DataMapperModule {}
