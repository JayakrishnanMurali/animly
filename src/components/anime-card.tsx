import React from 'react';

import type { Anime } from '@/api/anime';
import { Image, Pressable, Text, View } from '@/components/ui';

interface AnimeCardProps {
  anime: Anime;
  onPress?: () => void;
}

export const AnimeCard: React.FC<AnimeCardProps> = ({ anime, onPress }) => {
  return (
    <Pressable
      onPress={onPress}
      className="mb-4 overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm"
    >
      <View className="flex-row">
        <Image
          source={{ uri: anime.coverImage }}
          className="h-28 w-20 bg-gray-200"
          resizeMode="cover"
        />
        <View className="flex-1 p-3">
          <Text
            className="mb-1 text-lg font-semibold text-gray-900"
            numberOfLines={2}
          >
            {anime.title}
          </Text>
          <Text className="mb-2 text-sm text-gray-600" numberOfLines={3}>
            {anime.synopsis}
          </Text>
          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center">
              <Text className="text-sm font-medium text-yellow-600">
                ⭐ {anime.rating}
              </Text>
              <Text className="ml-2 text-sm text-gray-500">
                {anime.totalEpisodes} eps
              </Text>
            </View>
            <View className="flex-row flex-wrap">
              {anime.genres.slice(0, 2).map((genre, index) => (
                <Text
                  key={index}
                  className="mr-1 rounded-full bg-blue-100 px-2 py-1 text-xs text-blue-800"
                >
                  {genre}
                </Text>
              ))}
            </View>
          </View>
        </View>
      </View>
    </Pressable>
  );
};
