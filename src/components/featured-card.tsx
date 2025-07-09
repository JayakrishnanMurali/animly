import React from 'react';

import type { Anime, Manga } from '@/api/anime';
import { Image, Pressable, Text, View } from '@/components/ui';

interface FeaturedCardProps {
  content: Anime | Manga;
  type: 'anime' | 'manga';
  onPress?: () => void;
}

export const FeaturedCard: React.FC<FeaturedCardProps> = ({
  content,
  type,
  onPress,
}) => {
  const getBadgeColor = () => {
    if (content.rating >= 9.0) return 'bg-yellow-500';
    if (content.rating >= 8.5) return 'bg-orange-500';
    return 'bg-blue-500';
  };

  const getBadgeText = () => {
    if (content.rating >= 9.0) return 'MASTERPIECE';
    if (content.rating >= 8.5) return 'TRENDING';
    return 'POPULAR';
  };

  const getStatusColor = () => {
    switch (content.status) {
      case 'ongoing':
        return 'bg-green-500';
      case 'completed':
        return 'bg-blue-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <Pressable
      onPress={onPress}
      className="relative mx-4 mb-6 size-80 overflow-hidden rounded-3xl shadow-lg"
    >
      <Image
        source={{ uri: content.bannerImage || content.coverImage }}
        className="absolute inset-0 size-full"
        resizeMode="cover"
      />

      {/* Gradient overlay */}
      <View className="absolute inset-x-0 bottom-0 h-48 bg-black/70" />

      {/* Top badges */}
      <View className="absolute left-4 top-4 flex-row space-x-2">
        <View className={`rounded-full px-3 py-1 ${getBadgeColor()}`}>
          <Text className="text-xs font-bold text-white">{getBadgeText()}</Text>
        </View>
        <View className={`rounded-full px-3 py-1 ${getStatusColor()}`}>
          <Text className="text-xs font-bold uppercase text-white">
            {content.status}
          </Text>
        </View>
      </View>

      {/* Type indicator */}
      <View className="absolute right-4 top-4">
        <View className="rounded-full bg-white/20 px-3 py-1 backdrop-blur-sm">
          <Text className="text-xs font-bold uppercase text-white">{type}</Text>
        </View>
      </View>

      {/* Content info */}
      <View className="absolute inset-x-0 bottom-0 p-6">
        <View className="mb-2 flex-row items-center">
          <Text className="text-sm font-medium text-yellow-400">
            ⭐ {content.rating}
          </Text>
          <Text className="ml-2 text-sm text-white/70">
            {type === 'anime'
              ? (content as Anime).studio
              : (content as Manga).author}
          </Text>
        </View>

        <Text className="mb-3 text-2xl font-bold text-white">
          {content.title}
        </Text>

        <Text className="mb-4 text-sm text-white/90" numberOfLines={2}>
          {content.synopsis}
        </Text>

        <View className="flex-row flex-wrap">
          {content.genres.slice(0, 3).map((genre, index) => (
            <View
              key={index}
              className="mb-2 mr-2 rounded-full bg-white/20 px-3 py-1"
            >
              <Text className="text-xs font-medium text-white">{genre}</Text>
            </View>
          ))}
        </View>
      </View>
    </Pressable>
  );
};
