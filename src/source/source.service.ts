import { Source } from '@/common';
import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { SchedulerRegistry } from '@nestjs/schedule';
import * as fs from 'fs';
import * as path from 'path';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class SourceService implements OnModuleInit {
  private readonly logger = new Logger(SourceService.name);

  constructor(
    private readonly schedulerRegistry: SchedulerRegistry,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  onModuleInit() {
    const configPath = path.join(__dirname, 'config/sources.json');
    const sources = JSON.parse(fs.readFileSync(configPath, 'utf-8')) as Source[];

    sources.forEach((source) => {
      const intervalName = `ingest.${uuidv4()}`;
      const interval = setInterval(() => {
        this.logger.log(`Ingesting ${source.name}...`);
        this.eventEmitter.emit(intervalName, source);
      }, source.interval * 1000);

      this.schedulerRegistry.addInterval(intervalName, interval);
      this.logger.log(`Scheduled ${source.name} every ${source.interval} seconds`);
    });
  }
}
