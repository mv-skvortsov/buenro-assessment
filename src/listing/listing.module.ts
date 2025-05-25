import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ListingEntity, ListingSchema } from './schemas';
import { ListingService } from './listing.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: ListingEntity.name, schema: ListingSchema }])],
  providers: [ListingService],
  exports: [ListingService],
})
export class ListingModule {}
