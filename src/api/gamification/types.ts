export interface UserProfile {
  id: string;
  username: string;
  level: number;
  xp: number;
  xpToNextLevel: number;
  totalXp: number;
  streak: number;
  longestStreak: number;
  rank: string;
  badges: Badge[];
  achievements: Achievement[];
  stats: UserStats;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  unlockedAt?: string;
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  category: 'reading' | 'social' | 'collection' | 'streak' | 'special';
  progress: number;
  target: number;
  xpReward: number;
  badgeReward?: string;
  completed: boolean;
  completedAt?: string;
}

export interface UserStats {
  chaptersRead: number;
  episodesWatched: number;
  hoursSpent: number;
  favoriteGenres: string[];
  readingStreak: number;
  completedSeries: number;
  averageRating: number;
}

export interface Challenge {
  id: string;
  name: string;
  description: string;
  type: 'daily' | 'weekly' | 'monthly' | 'event';
  category: 'reading' | 'discovery' | 'social' | 'completion';
  target: number;
  progress: number;
  xpReward: number;
  deadline: string;
  completed: boolean;
}

export interface Recommendation {
  id: string;
  content: any; // Will be Anime | Manga
  type: 'anime' | 'manga';
  reason: string;
  confidence: number;
  category:
    | 'trending'
    | 'similar'
    | 'genre_match'
    | 'friend_activity'
    | 'seasonal';
}

export interface LeaderboardEntry {
  rank: number;
  user: {
    id: string;
    username: string;
    avatar: string;
    level: number;
  };
  xp: number;
  weeklyXp: number;
}
