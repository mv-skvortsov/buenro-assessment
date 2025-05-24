import { Source } from '@/common';
import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class IngestionService {
  private readonly logger = new Logger(IngestionService.name);

  ingest(event: Source) {
    this.logger.log(`Ingesting ${event.name}...`);
  }
}
