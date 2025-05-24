import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EventEmitterModule } from '@nestjs/event-emitter';

import { ScheduleModule } from '@nestjs/schedule';

import { DataMapperModule } from './data-mapper/data-mapper.module';
import { IngestionModule } from './ingestion/ingestion.module';
import { ListingModule } from './listing/listing.module';
import { SourceModule } from './source/source.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: ['.env.local', '.env'], isGlobal: true, cache: true }),
    EventEmitterModule.forRoot({ wildcard: true }),
    ScheduleModule.forRoot(),
    DataMapperModule,
    IngestionModule,
    ListingModule,
    SourceModule,
  ],
})
export class AppModule {}
