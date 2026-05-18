import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { AnimeReleasesResponse } from './types/anime.types';

@Injectable()
export class AnimeService {
  constructor(private readonly httpService: HttpService) {}

  async getReleases(
    page: number = 1,
    limit: number = 10,
    genres?: number[],
  ): Promise<AnimeReleasesResponse> {
    const params: Record<string, string | number> = { page, limit };

    if (genres && genres.length > 0) {
      params['f[genres]'] = genres.join(',');
    }

    const response = await firstValueFrom(
      this.httpService.get<AnimeReleasesResponse>('/anime/catalog/releases', {
        params,
      }),
    );
    return response.data;
  }

  async searchAnime(query: string): Promise<AnimeReleasesResponse> {
    const response = await firstValueFrom(
      this.httpService.get<AnimeReleasesResponse>('/app/search/releases', {
        params: { query },
      }),
    );
    return response.data;
  }
}
