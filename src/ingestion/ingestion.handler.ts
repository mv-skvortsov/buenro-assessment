import { Source } from '@/common';
import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { IngestionService } from './ingestion.service';

@Injectable()
export class IngestionHandler {
  constructor(private readonly service: IngestionService) {}

  @OnEvent('ingest.*', { async: true })
  onIngestStart(event: Source) {
    this.service.ingest(event);
  }
}
