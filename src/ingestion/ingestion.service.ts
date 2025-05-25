import { DataPipe, Listing } from '@/common';
import { DataFetcherRegistry } from '@/data-fetcher/data-fetcher.registry';
import { DataMapperRegistry } from '@/data-mapper/data-mapper.registry';
import { ListingService } from '@/listing/listing.service';
import { Injectable, Logger } from '@nestjs/common';
import StreamArray from 'stream-json/streamers/StreamArray';

const BatchSize = 1000;

@Injectable()
export class IngestionService {
  private readonly logger = new Logger(IngestionService.name);

  constructor(
    private readonly dataFetcherRegistry: DataFetcherRegistry,
    private readonly dataMapperRegistry: DataMapperRegistry,
    private readonly listingService: ListingService, // inject ListingService
  ) {}

  async ingest(pipe: DataPipe) {
    this.logger.log(`Starting ingestion: ${pipe.name}`);

    const fetcher = this.dataFetcherRegistry.get(pipe.source.type);
    const mapper = this.dataMapperRegistry.get(pipe.mapper);

    const stream = await fetcher.getStream(pipe.source);
    const parser = stream.pipe(StreamArray.withParser());

    const batch: Listing[] = [];
    for await (const { value } of parser) {
      const listing = await mapper.toListing({ source: pipe.name, data: value });
      if (listing) batch.push(listing);

      if (batch.length >= BatchSize) {
        await this.flushBatch(batch);
      }
    }

    if (batch.length > 0) {
      await this.flushBatch(batch);
    }

    this.logger.log(`Finished ingestion: ${pipe.name}`);
  }

  private async flushBatch(batch: Listing[]) {
    if (batch.length === 0) return;

    try {
      await this.listingService.bulkUpsert(batch);
      this.logger.log(`Inserted batch of ${batch.length} listings.`);
    } catch (error) {
      if (error instanceof Error) {
        this.logger.error(`Error inserting batch: ${error.message}`);
      } else {
        this.logger.error(`Error inserting batch: ${JSON.stringify(error)}`);
      }
      // TODO: add retry or fallback logic here
    } finally {
      batch.length = 0;
    }
  }
}
