import { Module } from '@nestjs/common';
import { IngestionHandler } from './ingestion.handler';
import { IngestionService } from './ingestion.service';

import { DataFetcherModule } from '@/data-fetcher/data-fetcher.module';
import { DataMapperModule } from '@/data-mapper/data-mapper.module';
import { ListingModule } from '@/listing/listing.module';

@Module({
  imports: [DataFetcherModule, DataMapperModule, ListingModule],
  providers: [IngestionHandler, IngestionService],
})
export class IngestionModule {}
