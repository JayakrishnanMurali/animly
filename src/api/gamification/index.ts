export * from './mock-data';
export * from './types';

// Utility functions for gamification
export const calculateLevel = (totalXp: number): number => {
  return Math.floor(totalXp / 1000) + 1;
};

export const calculateXpToNextLevel = (totalXp: number): number => {
  const currentLevel = calculateLevel(totalXp);
  const xpForNextLevel = currentLevel * 1000;
  return xpForNextLevel - totalXp;
};

export const getRankTitle = (level: number): string => {
  if (level >= 50) return 'Legendary Otaku';
  if (level >= 40) return 'Master Reader';
  if (level >= 30) return 'Anime Sage';
  if (level >= 25) return 'Manga Expert';
  if (level >= 20) return 'Chapter Champion';
  if (level >= 15) return 'Manga Enthusiast';
  if (level >= 10) return 'Rising Reader';
  if (level >= 5) return 'Curious Explorer';
  return 'Newbie Reader';
};

export const getBadgeRarityColor = (rarity: string): string => {
  switch (rarity) {
    case 'legendary':
      return 'from-yellow-400 to-orange-500';
    case 'epic':
      return 'from-purple-500 to-pink-500';
    case 'rare':
      return 'from-blue-400 to-cyan-400';
    case 'common':
    default:
      return 'from-gray-400 to-gray-500';
  }
};

export const getXpReward = (action: string): number => {
  const rewards: { [key: string]: number } = {
    read_chapter: 10,
    watch_episode: 15,
    complete_series: 100,
    add_to_library: 5,
    rate_content: 20,
    write_review: 50,
    daily_login: 25,
    streak_bonus: 50,
  };
  return rewards[action] || 0;
};
