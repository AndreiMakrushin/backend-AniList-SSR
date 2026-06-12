// dto/anime-response.dto.ts
import { ApiProperty } from '@nestjs/swagger';

// 1. Класс для элемента аниме (одна запись в списке релизов)
export class AnimeReleaseItem {
  @ApiProperty({ example: 1, description: 'ID аниме' })
  id!: number;

  @ApiProperty({ example: 'Наруто', description: 'Название аниме' })
  title!: string;

  @ApiProperty({ example: 'naruto.jpg', description: 'Постер' })
  poster!: string;

  @ApiProperty({ example: '2024-04-01', description: 'Дата выхода' })
  release_date!: string;

  // добавь остальные поля, которые приходят из API
}

// 2. Класс для пагинации
export class PaginationLinks {
  @ApiProperty({ nullable: true })
  previous!: string | null;

  @ApiProperty({ nullable: true })
  next!: string | null;
}

export class Pagination {
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

export class AnimeMeta {
  @ApiProperty({ type: Pagination })
  pagination!: Pagination;
}

// 3. Главный класс ответа
export class AnimeReleasesResponse {
  @ApiProperty({ type: [AnimeReleaseItem] })
  data!: AnimeReleaseItem[];

  @ApiProperty({ type: AnimeMeta })
  meta!: AnimeMeta;
}
