import { DataPipe } from '@/common';
import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { IngestionService } from './ingestion.service';

@Injectable()
export class IngestionHandler {
  constructor(private readonly service: IngestionService) {}

  @OnEvent('ingest.start', { async: true })
  async onIngest(pipe: DataPipe) {
    await this.service.ingest(pipe);
  }
}
