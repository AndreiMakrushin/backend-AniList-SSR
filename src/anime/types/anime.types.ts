// types/anime.types.ts

// Тип для названия
export interface AnimeName {
  main: string;
  english: string;
  alternative: string;
}

// Тип для базовых значений (type, season, age_rating и т.д.)
export interface AnimeValueType {
  value: string;
  description: string;
}

// Тип для возрастного рейтинга
export interface AnimeAgeRating {
  value: string;
  label: string;
  is_adult: boolean;
  description: string;
}

// Тип для постера
export interface AnimeImage {
  preview: string;
  thumbnail: string;
  optimized?: {
    preview: string;
    thumbnail: string;
  };
}

// Тип для жанра
export interface AnimeGenre {
  id: number;
  name: string;
  image: AnimeImage;
  total_releases: number;
}

// Тип для дня публикации
export interface AnimePublishDay {
  value: number;
  description: string;
}

// Тип для самого аниме
export interface Anime {
  id: number;
  type: AnimeValueType;
  year: number;
  name: AnimeName;
  alias: string;
  season: AnimeValueType;
  poster: AnimeImage;
  fresh_at: string;
  created_at: string;
  updated_at: string;
  is_ongoing: boolean;
  age_rating: AnimeAgeRating;
  publish_day: AnimePublishDay;
  description: string;
  notification: string;
  episodes_total: number;
  external_player: string;
  is_in_production: boolean;
  is_blocked_by_geo: boolean;
  is_blocked_by_copyrights: boolean;
  added_in_users_favorites: number;
  average_duration_of_episode: number;
  added_in_planned_collection: number;
  added_in_watched_collection: number;
  added_in_watching_collection: number;
  added_in_postponed_collection: number;
  added_in_abandoned_collection: number;
  genres: AnimeGenre[];
}

// Тип для пагинации
export interface PaginationLinks {
  previous: string | null;
  next: string | null;
}

export interface Pagination {
  total: number;
  count: number;
  per_page: number;
  current_page: number;
  total_pages: number;
  links: PaginationLinks;
}

// Тип для meta с пагинацией
export interface AnimeMeta {
  pagination: Pagination;
}

// Тип для всего ответа
export interface AnimeReleasesResponse {
  data: Anime[];
  meta: AnimeMeta;
}
