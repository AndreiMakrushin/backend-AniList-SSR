// dto/anime-response.dto.ts
import { ApiProperty } from '@nestjs/swagger';

class PaginationLinks {
  @ApiProperty()
  previous!: string | null;

  @ApiProperty()
  next!: string | null;
}

class Pagination {
  @ApiProperty()
  total!: number;

  @ApiProperty()
  count!: number;

  @ApiProperty()
  per_page!: number;

  @ApiProperty()
  current_page!: number;

  @ApiProperty()
  total_pages!: number;

  @ApiProperty({ type: PaginationLinks })
  links!: PaginationLinks;
}

class AnimeMeta {
  @ApiProperty({ type: Pagination })
  pagination!: Pagination;
}

export class AnimeReleasesResponse {
  @ApiProperty({ isArray: true })
  data!: any[]; // или конкретный тип AnimeRelease

  @ApiProperty({ type: AnimeMeta })
  meta!: AnimeMeta;
}
