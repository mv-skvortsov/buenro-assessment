// listing.service.ts
import { Listing } from '@/common';
import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ListingDocument, ListingEntity } from './schemas';

@Injectable()
export class ListingService {
  private readonly logger = new Logger(ListingService.name);

  constructor(
    @InjectModel(ListingEntity.name)
    private readonly listingModel: Model<ListingDocument>,
  ) {}

  async bulkUpsert(listings: Listing[]): Promise<void> {
    if (listings.length === 0) {
      return;
    }

    const operations = listings.map((item) => ({
      updateOne: {
        filter: { source: item.source, originalId: item.originalId },
        update: { $set: item },
        upsert: true,
      },
    }));

    try {
      await this.listingModel.bulkWrite(operations, { ordered: false });
    } catch (error) {
      this.logger.error(`Bulk upsert failed: ${(error as Error).message}`);
    }
  }
}
