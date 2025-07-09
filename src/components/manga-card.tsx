import React from 'react';

import type { Manga } from '@/api/anime';
import { Image, Pressable, Text, View } from '@/components/ui';

interface MangaCardProps {
  manga: Manga;
  onPress?: () => void;
}

export const MangaCard: React.FC<MangaCardProps> = ({ manga, onPress }) => {
  return (
    <Pressable
      onPress={onPress}
      className="mb-4 overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm"
    >
      <View className="flex-row">
        <Image
          source={{ uri: manga.coverImage }}
          className="h-28 w-20 bg-gray-200"
          resizeMode="cover"
        />
        <View className="flex-1 p-3">
          <Text
            className="mb-1 text-lg font-semibold text-gray-900"
            numberOfLines={2}
          >
            {manga.title}
          </Text>
          <Text className="mb-2 text-sm text-gray-600" numberOfLines={3}>
            {manga.synopsis}
          </Text>
          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center">
              <Text className="text-sm font-medium text-yellow-600">
                ⭐ {manga.rating}
              </Text>
              <Text className="ml-2 text-sm text-gray-500">
                {manga.totalChapters} ch
              </Text>
            </View>
            <View className="flex-row flex-wrap">
              {manga.genres.slice(0, 2).map((genre, index) => (
                <Text
                  key={index}
                  className="mr-1 rounded-full bg-green-100 px-2 py-1 text-xs text-green-800"
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
