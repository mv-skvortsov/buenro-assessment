import { Controller, Get, Query } from '@nestjs/common';
import { ListingQueryDto, ListingSearchResultDto } from './dto';
import { ListingService } from './listing.service';

@Controller('listings')
export class ListingController {
  constructor(private readonly service: ListingService) {}

  @Get('search')
  async search(@Query() query: ListingQueryDto): Promise<ListingSearchResultDto> {
    return this.service.search(query);
  }
}
