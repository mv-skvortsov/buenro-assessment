import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { DataMapperModule } from './data-mapper/data-mapper.module';
import { IngestionModule } from './ingestion/ingestion.module';
import { ListingModule } from './listing/listing.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: ['.env.local', '.env'], isGlobal: true, cache: true }),
    DataMapperModule,
    IngestionModule,
    ListingModule,
  ],
})
export class AppModule {}
