// dto/releases-query.dto.ts
import { ApiPropertyOptional } from '@nestjs/swagger';

export class ReleasesQueryDto {
  @ApiPropertyOptional({ default: 1 })
  page?: number = 1;

  @ApiPropertyOptional({ default: 10 })
  limit?: number = 10;

  @ApiPropertyOptional({ type: [Number], description: 'ID жанров' })
  genres?: number[];
}
