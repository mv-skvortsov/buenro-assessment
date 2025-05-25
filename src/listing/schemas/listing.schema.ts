// listing.schema.ts
import { Listing, PriceSegment } from '@/common';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ListingDocument = HydratedDocument<ListingEntity>;

@Schema({ timestamps: true, collection: 'listing' })
export class ListingEntity implements Listing {
  @Prop({ required: true })
  source!: string;

  @Prop({ required: true })
  originalId!: string;

  @Prop()
  name?: string;

  @Prop()
  city?: string;

  @Prop()
  country?: string;

  @Prop({ required: true })
  availability!: boolean;

  @Prop({ required: true })
  pricePerNight!: number;

  @Prop()
  priceSegment?: PriceSegment;
}

export const ListingSchema = SchemaFactory.createForClass(ListingEntity);

// Add indexes
ListingSchema.index({ source: 1, originalId: 1 }, { unique: true });
ListingSchema.index({ name: 1 }, { sparse: true });
ListingSchema.index({ city: 1 });
ListingSchema.index({ country: 1 }, { sparse: true });
ListingSchema.index({ availability: 1 });
ListingSchema.index({ pricePerNight: 1 });
ListingSchema.index({ priceSegment: 1 });
