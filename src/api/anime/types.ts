export interface Anime {
  id: string;
  title: string;
  synopsis: string;
  genres: string[];
  status: 'ongoing' | 'completed' | 'upcoming' | 'hiatus';
  episodes: Episode[];
  totalEpisodes: number;
  rating: number;
  coverImage: string;
  bannerImage?: string;
  releaseDate: string;
  studio: string;
  duration: number; // in minutes
  source: 'manga' | 'novel' | 'original' | 'game' | 'other';
}

export interface Episode {
  id: string;
  animeId: string;
  number: number;
  title: string;
  description: string;
  duration: number; // in seconds
  thumbnail: string;
  videoUrl: string;
  releaseDate: string;
  watched: boolean;
  watchProgress: number; // 0-1 (percentage)
}

export interface Manga {
  id: string;
  title: string;
  synopsis: string;
  genres: string[];
  status: 'ongoing' | 'completed' | 'hiatus';
  chapters: Chapter[];
  totalChapters: number;
  rating: number;
  coverImage: string;
  bannerImage?: string;
  releaseDate: string;
  author: string;
  artist: string;
  demographic: 'shounen' | 'shoujo' | 'seinen' | 'josei' | 'kodomomuke';
}

export interface Chapter {
  id: string;
  mangaId: string;
  number: number;
  title: string;
  pages: Page[];
  releaseDate: string;
  read: boolean;
  readProgress: number; // 0-1 (percentage)
}

export interface Page {
  id: string;
  chapterId: string;
  number: number;
  imageUrl: string;
  width: number;
  height: number;
}

export interface UserProgress {
  userId: string;
  contentId: string;
  contentType: 'anime' | 'manga';
  status:
    | 'watching'
    | 'reading'
    | 'completed'
    | 'on_hold'
    | 'dropped'
    | 'plan_to_watch'
    | 'plan_to_read';
  progress: number; // episode/chapter number
  score?: number; // 1-10
  startDate?: string;
  endDate?: string;
  notes?: string;
}

export interface UserFavorite {
  userId: string;
  contentId: string;
  contentType: 'anime' | 'manga';
  addedDate: string;
}

export interface Genre {
  id: string;
  name: string;
  description: string;
}
