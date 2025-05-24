import { SetMetadata } from '@nestjs/common';

export const DATA_FETCHER_KEY = 'data_fetcher';

export const SourceFetcher = (type: string): ClassDecorator => SetMetadata(DATA_FETCHER_KEY, type);
