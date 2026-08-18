import { Controller, Get, Query, BadRequestException } from '@nestjs/common';
import { AnimeService } from './anime.service';
import { ApiTags, ApiOperation, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { AnimeReleasesResponse, AnimeResponse } from './dto/anime-response.dto';
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

  @Get('search-by-name')
  @ApiOperation({ summary: 'Поиск аниме по названию' })
  @ApiResponse({ status: 200, type: AnimeReleasesResponse })
  @ApiQuery({
    name: 'animeName',
    required: true,
    description: 'Название аниме для поиска',
  })
  async searchByName(
    @Query('animeName') animeName: string,
  ): Promise<AnimeReleasesResponse> {
    if (!animeName) {
      throw new BadRequestException('Необходимо указать animeName');
    }
    return this.animeService.searchAnimeByName(animeName);
  }

  @Get('search-by-id')
  @ApiOperation({ summary: 'Поиск аниме по ID' })
  @ApiResponse({ status: 200, type: AnimeResponse })
  @ApiQuery({
    name: 'id',
    required: true,
    description: 'ID аниме',
  })
  async searchById(@Query('id') id: number): Promise<AnimeResponse> {
    if (!id) {
      throw new BadRequestException('Необходимо указать id');
    }
    return this.animeService.searchAnimeById(id);
  }
}
