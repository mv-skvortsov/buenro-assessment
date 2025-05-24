import { Module } from '@nestjs/common';
import { SourceService } from './source.service';

@Module({
  providers: [SourceService],
})
export class SourceModule {}
