import { mockAnime, mockManga } from '../anime';
import type {
  Achievement,
  Badge,
  Challenge,
  LeaderboardEntry,
  Recommendation,
  UserProfile,
} from './types';

export const mockUserProfile: UserProfile = {
  id: '1',
  username: 'OtakuReader42',
  level: 15,
  xp: 2350,
  xpToNextLevel: 650,
  totalXp: 14850,
  streak: 7,
  longestStreak: 23,
  rank: 'Manga Enthusiast',
  badges: [],
  achievements: [],
  stats: {
    chaptersRead: 342,
    episodesWatched: 128,
    hoursSpent: 156,
    favoriteGenres: ['Action', 'Fantasy', 'Drama'],
    readingStreak: 7,
    completedSeries: 23,
    averageRating: 8.4,
  },
};

export const mockBadges: Badge[] = [
  {
    id: '1',
    name: 'First Steps',
    description: 'Read your first chapter',
    icon: '👶',
    rarity: 'common',
    unlockedAt: '2024-01-15T10:30:00Z',
  },
  {
    id: '2',
    name: 'Speed Reader',
    description: 'Read 10 chapters in one day',
    icon: '⚡',
    rarity: 'rare',
    unlockedAt: '2024-02-03T18:45:00Z',
  },
  {
    id: '3',
    name: 'Streak Master',
    description: 'Maintain a 30-day reading streak',
    icon: '🔥',
    rarity: 'epic',
  },
  {
    id: '4',
    name: 'Genre Explorer',
    description: 'Read content from 10 different genres',
    icon: '🌍',
    rarity: 'rare',
    unlockedAt: '2024-02-20T14:20:00Z',
  },
  {
    id: '5',
    name: 'Completionist',
    description: 'Finish 50 series',
    icon: '👑',
    rarity: 'legendary',
  },
  {
    id: '6',
    name: 'Night Owl',
    description: 'Read after midnight 5 times',
    icon: '🦉',
    rarity: 'common',
    unlockedAt: '2024-01-28T01:15:00Z',
  },
];

export const mockAchievements: Achievement[] = [
  {
    id: '1',
    name: 'Chapter Master',
    description: 'Read 500 chapters',
    category: 'reading',
    progress: 342,
    target: 500,
    xpReward: 1000,
    badgeReward: '3',
    completed: false,
  },
  {
    id: '2',
    name: 'Binge Watcher',
    description: 'Watch 200 episodes',
    category: 'reading',
    progress: 128,
    target: 200,
    xpReward: 800,
    completed: false,
  },
  {
    id: '3',
    name: 'Collector',
    description: 'Add 100 items to your library',
    category: 'collection',
    progress: 67,
    target: 100,
    xpReward: 500,
    completed: false,
  },
  {
    id: '4',
    name: 'Consistent Reader',
    description: 'Maintain a 14-day streak',
    category: 'streak',
    progress: 7,
    target: 14,
    xpReward: 350,
    completed: false,
  },
  {
    id: '5',
    name: 'Social Butterfly',
    description: 'Rate 50 series',
    category: 'social',
    progress: 23,
    target: 50,
    xpReward: 400,
    completed: false,
  },
  {
    id: '6',
    name: 'Early Bird',
    description: 'Read before 8 AM for 7 days',
    category: 'special',
    progress: 3,
    target: 7,
    xpReward: 200,
    completed: false,
  },
];

export const mockChallenges: Challenge[] = [
  {
    id: '1',
    name: 'Daily Reader',
    description: 'Read 3 chapters today',
    type: 'daily',
    category: 'reading',
    target: 3,
    progress: 1,
    xpReward: 50,
    deadline: '2024-07-09T23:59:59Z',
    completed: false,
  },
  {
    id: '2',
    name: 'Genre Hopper',
    description: 'Read from 3 different genres this week',
    type: 'weekly',
    category: 'discovery',
    target: 3,
    progress: 2,
    xpReward: 200,
    deadline: '2024-07-14T23:59:59Z',
    completed: false,
  },
  {
    id: '3',
    name: 'Marathon Month',
    description: 'Read 100 chapters this month',
    type: 'monthly',
    category: 'reading',
    target: 100,
    progress: 34,
    xpReward: 1000,
    deadline: '2024-07-31T23:59:59Z',
    completed: false,
  },
  {
    id: '4',
    name: 'Complete a Series',
    description: 'Finish reading any series',
    type: 'weekly',
    category: 'completion',
    target: 1,
    progress: 0,
    xpReward: 300,
    deadline: '2024-07-14T23:59:59Z',
    completed: false,
  },
  {
    id: '5',
    name: 'Rate & Review',
    description: 'Rate 5 series this week',
    type: 'weekly',
    category: 'social',
    target: 5,
    progress: 2,
    xpReward: 150,
    deadline: '2024-07-14T23:59:59Z',
    completed: false,
  },
];

export const mockRecommendations: Recommendation[] = [
  {
    id: '1',
    content: mockManga[4], // Berserk
    type: 'manga',
    reason: 'Based on your love for dark fantasy',
    confidence: 95,
    category: 'genre_match',
  },
  {
    id: '2',
    content: mockAnime[6], // Hunter x Hunter
    type: 'anime',
    reason: 'Trending among users with similar tastes',
    confidence: 88,
    category: 'similar',
  },
  {
    id: '3',
    content: mockManga[5], // One Punch Man
    type: 'manga',
    reason: 'Popular this week',
    confidence: 82,
    category: 'trending',
  },
  {
    id: '4',
    content: mockAnime[7], // Spirited Away
    type: 'anime',
    reason: 'Perfect for weekend viewing',
    confidence: 90,
    category: 'seasonal',
  },
];

export const mockLeaderboard: LeaderboardEntry[] = [
  {
    rank: 1,
    user: {
      id: '2',
      username: 'MangaKing',
      avatar: 'https://pic.re/image/80x80/avatar-1',
      level: 28,
    },
    xp: 45230,
    weeklyXp: 1250,
  },
  {
    rank: 2,
    user: {
      id: '3',
      username: 'AnimeQueen',
      avatar: 'https://pic.re/image/80x80/avatar-2',
      level: 25,
    },
    xp: 42180,
    weeklyXp: 980,
  },
  {
    rank: 3,
    user: {
      id: '1',
      username: 'OtakuReader42',
      avatar: 'https://pic.re/image/80x80/profile-avatar',
      level: 15,
    },
    xp: 14850,
    weeklyXp: 750,
  },
  {
    rank: 4,
    user: {
      id: '4',
      username: 'ReadingNinja',
      avatar: 'https://pic.re/image/80x80/avatar-3',
      level: 22,
    },
    xp: 38920,
    weeklyXp: 650,
  },
  {
    rank: 5,
    user: {
      id: '5',
      username: 'ChapterChaser',
      avatar: 'https://pic.re/image/80x80/avatar-4',
      level: 19,
    },
    xp: 32150,
    weeklyXp: 580,
  },
];

// Update user profile with badges and achievements
mockUserProfile.badges = mockBadges.filter((badge) => badge.unlockedAt);
mockUserProfile.achievements = mockAchievements;
