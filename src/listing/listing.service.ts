import { Listing } from '@/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Cache } from 'cache-manager';
import * as crypto from 'crypto';
import { Model } from 'mongoose';
import { ListingDto, ListingQueryDto, ListingSearchResultDto } from './dto';
import { ListingDocument, ListingEntity } from './schemas';

@Injectable()
export class ListingService {
  private readonly logger = new Logger(ListingService.name);

  constructor(
    @InjectModel(ListingEntity.name)
    private readonly listingModel: Model<ListingDocument>,
    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
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

  async search(filters: ListingQueryDto): Promise<ListingSearchResultDto> {
    const cacheKey = this.buildCacheKey(filters);
    const cached = await this.cacheManager.get<ListingSearchResultDto>(cacheKey);

    if (cached) {
      return cached;
    }

    const { name, city, country, availability, minPrice, maxPrice, priceSegment, skip = 0, limit = 20 } = filters;

    const query = this.listingModel.find();

    if (name) query.where('name').regex(new RegExp(name, 'i'));
    if (city) query.where('city').regex(new RegExp(city, 'i'));
    if (country) query.where('country').regex(new RegExp(country, 'i'));

    if (availability !== undefined) query.where('availability').equals(availability);

    if (minPrice !== undefined) query.where('pricePerNight').gte(minPrice);
    if (maxPrice !== undefined) query.where('pricePerNight').lte(maxPrice);

    if (priceSegment && priceSegment.length > 0) {
      query.where('priceSegment').in(priceSegment);
    }

    const [rawResults, total] = await Promise.all([
      query.skip(skip).limit(limit).lean().exec(),
      this.listingModel.countDocuments(query.getFilter()),
    ]);

    const results = rawResults.map(
      (doc) =>
        ({
          name: doc.name,
          city: doc.city,
          country: doc.country,
          availability: doc.availability,
          pricePerNight: doc.pricePerNight,
          priceSegment: doc.priceSegment,
        }) as ListingDto,
    );

    const response: ListingSearchResultDto = {
      total,
      skip,
      limit,
      results,
    };

    await this.cacheManager.set(cacheKey, response, 60000);

    return response;
  }

  private buildCacheKey(filters: ListingQueryDto): string {
    return `search:${crypto.createHash('sha256').update(JSON.stringify(filters)).digest('hex')}`;
  }
}
