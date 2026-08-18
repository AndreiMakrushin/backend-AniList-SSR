import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { AnimeReleasesResponse, AnimeResponse } from './dto/anime-response.dto';

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

  async searchAnimeByName(animeName: string): Promise<AnimeReleasesResponse> {
    const response = await firstValueFrom(
      this.httpService.get<AnimeReleasesResponse>('/anime/catalog/releases', {
        params: { query: animeName },
      }),
    );
    return response.data;
  }

  async searchAnimeById(id: number): Promise<AnimeResponse> {
    const response = await firstValueFrom(
      this.httpService.get<AnimeResponse>(`/anime/releases/${id}`),
    );

    return response.data;
  }
}
