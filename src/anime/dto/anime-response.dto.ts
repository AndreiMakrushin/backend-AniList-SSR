import { ApiProperty } from '@nestjs/swagger';

// ========== Вспомогательные DTO ==========

export class AnimeName {
  @ApiProperty()
  main!: string;

  @ApiProperty()
  english!: string;

  @ApiProperty()
  alternative!: string;
}

export class AnimeValueType {
  @ApiProperty()
  value!: string;

  @ApiProperty()
  description!: string;
}

export class AnimeAgeRating {
  @ApiProperty()
  value!: string;

  @ApiProperty()
  label!: string;

  @ApiProperty()
  is_adult!: boolean;

  @ApiProperty()
  description!: string;
}

export class AnimeImage {
  @ApiProperty()
  preview!: string;

  @ApiProperty()
  thumbnail!: string;

  @ApiProperty({ required: false })
  optimized?: {
    preview: string;
    thumbnail: string;
  };
}

export class AnimeGenre {
  @ApiProperty()
  id!: number;

  @ApiProperty()
  name!: string;

  @ApiProperty({ type: AnimeImage })
  image!: AnimeImage;

  @ApiProperty()
  total_releases!: number;
}

export class AnimePublishDay {
  @ApiProperty()
  value!: number;

  @ApiProperty()
  description!: string;
}

// ========== Главный DTO для аниме ==========
export class Anime {
  @ApiProperty()
  id!: number;

  @ApiProperty({ type: AnimeValueType })
  type!: AnimeValueType;

  @ApiProperty()
  year!: number;

  @ApiProperty({ type: AnimeName })
  name!: AnimeName;

  @ApiProperty()
  alias!: string;

  @ApiProperty({ type: AnimeValueType })
  season!: AnimeValueType;

  @ApiProperty({ type: AnimeImage })
  poster!: AnimeImage;

  @ApiProperty()
  fresh_at!: string;

  @ApiProperty()
  created_at!: string;

  @ApiProperty()
  updated_at!: string;

  @ApiProperty()
  is_ongoing!: boolean;

  @ApiProperty({ type: AnimeAgeRating })
  age_rating!: AnimeAgeRating;

  @ApiProperty({ type: AnimePublishDay })
  publish_day!: AnimePublishDay;

  @ApiProperty()
  description!: string;

  @ApiProperty()
  notification!: string;

  @ApiProperty()
  episodes_total!: number;

  @ApiProperty()
  external_player!: string;

  @ApiProperty()
  is_in_production!: boolean;

  @ApiProperty()
  is_blocked_by_geo!: boolean;

  @ApiProperty()
  is_blocked_by_copyrights!: boolean;

  @ApiProperty()
  added_in_users_favorites!: number;

  @ApiProperty()
  average_duration_of_episode!: number;

  @ApiProperty()
  added_in_planned_collection!: number;

  @ApiProperty()
  added_in_watched_collection!: number;

  @ApiProperty()
  added_in_watching_collection!: number;

  @ApiProperty()
  added_in_postponed_collection!: number;

  @ApiProperty()
  added_in_abandoned_collection!: number;

  @ApiProperty({ type: [AnimeGenre] })
  genres!: AnimeGenre[];
}

// ========== Пагинация ==========
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

// ========== Главный ответ ==========
export class AnimeReleasesResponse {
  @ApiProperty({ type: [Anime] })
  data!: Anime[];

  @ApiProperty({ type: AnimeMeta })
  meta!: AnimeMeta;
}

export class AnimeResponse {
  @ApiProperty({ type: Anime })
  data!: Anime;
}
