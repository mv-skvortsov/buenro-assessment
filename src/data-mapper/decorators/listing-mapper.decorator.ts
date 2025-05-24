import { SetMetadata } from '@nestjs/common';

export const DATA_MAPPER_KEY = 'data_mapper';

export const ListingMapper = (type: string): ClassDecorator => SetMetadata(DATA_MAPPER_KEY, type);
