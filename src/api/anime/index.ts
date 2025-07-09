import { mockAnime, mockGenres, mockManga } from './mock-data';

export * from './mock-data';
export * from './types';

// Mock API functions
export const getAnimeList = () => Promise.resolve(mockAnime);
export const getMangaList = () => Promise.resolve(mockManga);
export const getAnimeById = (id: string) =>
  Promise.resolve(mockAnime.find((anime) => anime.id === id));
export const getMangaById = (id: string) =>
  Promise.resolve(mockManga.find((manga) => manga.id === id));
export const getGenres = () => Promise.resolve(mockGenres);
