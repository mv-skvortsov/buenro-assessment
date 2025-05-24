import { DataPipe } from '@/common';
import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { SchedulerRegistry } from '@nestjs/schedule';
import * as fs from 'fs';
import * as path from 'path';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class SourceService implements OnModuleInit {
  private readonly logger = new Logger(SourceService.name);
  private pipes: DataPipe[] = [];

  constructor(
    private readonly schedulerRegistry: SchedulerRegistry,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  onModuleInit() {
    const configPath = path.join(__dirname, 'config/sources.json');
    this.pipes = JSON.parse(fs.readFileSync(configPath, 'utf-8')) as DataPipe[];

    this.pipes.forEach((pipe) => {
      const intervalName = `ingest.${uuidv4()}`;

      const interval = setInterval(() => {
        this.eventEmitter.emit('ingest.start', pipe);
      }, pipe.interval * 1000);

      this.schedulerRegistry.addInterval(intervalName, interval);
      this.logger.log(`Scheduled ${pipe.name} every ${pipe.interval} seconds`);
    });
  }

  onApplicationBootstrap() {
    this.pipes.forEach((pipe) => {
      this.logger.log(`Immediately emitting for ${pipe.name}`);
      this.eventEmitter.emit('ingest.start', pipe);
    });
  }
}
