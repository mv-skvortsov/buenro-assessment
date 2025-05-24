import { Module } from '@nestjs/common';
import { IngestionHandler } from './ingestion.handler';
import { IngestionService } from './ingestion.service';

@Module({
  providers: [IngestionHandler, IngestionService],
})
export class IngestionModule {}
