import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { MongooseModule } from '@nestjs/mongoose';
import { ScheduleModule } from '@nestjs/schedule';

import { DataFetcherModule } from './data-fetcher/data-fetcher.module';
import { DataMapperModule } from './data-mapper/data-mapper.module';
import { IngestionModule } from './ingestion/ingestion.module';
import { ListingModule } from './listing/listing.module';
import { SourceModule } from './source/source.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: ['.env.local', '.env'], isGlobal: true, cache: true }),
    EventEmitterModule.forRoot({ wildcard: true }),
    ScheduleModule.forRoot(),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI') || 'mongodb://localhost:27017/buenro',
      }),
      inject: [ConfigService],
    }),
    DataFetcherModule,
    DataMapperModule,
    IngestionModule,
    ListingModule,
    SourceModule,
  ],
})
export class AppModule {}
