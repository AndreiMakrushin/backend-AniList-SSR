import { Controller, Get, Query } from '@nestjs/common';
import { AnimeService } from './anime.service';
import { ApiTags, ApiOperation, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { AnimeReleasesResponse } from './dto/anime-response.dto';
import { ReleasesQueryDto } from './dto/releases-query.dto';

@ApiTags('Anime - сторонняя библиотека')
@Controller('anime')
export class AnimeController {
  constructor(private readonly animeService: AnimeService) {}

  @Get('catalog/releases')
  @ApiOperation({ summary: 'Получить релизы аниме' })
  @ApiResponse({ status: 200, type: AnimeReleasesResponse })
  @ApiQuery({
    name: 'genres',
    required: false,
    type: [Number],
    description: 'ID жанров (через запятую)',
  })
  async getReleases(
    @Query() query: ReleasesQueryDto,
  ): Promise<AnimeReleasesResponse> {
    let genresArray: number[] = [];
    const { page, limit, genres } = query;
    if (genres) {
      const genresStr = Array.isArray(genres) ? genres.join(',') : genres;
      genresArray = genresStr
        .split(',')
        .map(Number)
        .filter((id) => !isNaN(id));
    }

    return this.animeService.getReleases(page, limit, genresArray);
  }

  @Get('search')
  @ApiOperation({ summary: 'Поиск аниме' })
  @ApiQuery({ name: 'q', required: true, description: 'Поисковый запрос' })
  async search(@Query('q') query: string) {
    return this.animeService.searchAnime(query);
  }
}
