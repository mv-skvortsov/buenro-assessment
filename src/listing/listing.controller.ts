import { Controller, Get, Query } from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ListingQueryDto, ListingSearchResultDto } from './dto';
import { ListingService } from './listing.service';

@ApiTags('listings')
@Controller('listings')
export class ListingController {
  constructor(private readonly service: ListingService) {}

  @ApiOperation({ summary: 'Listing search' })
  @ApiBody({ type: ListingQueryDto, required: false, description: 'Listing search query' })
  @ApiOkResponse({ type: ListingSearchResultDto, description: 'Listing search result' })
  @Get('search')
  async search(@Query() query: ListingQueryDto): Promise<ListingSearchResultDto> {
    return this.service.search(query);
  }
}
