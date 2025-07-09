import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';

import type { Anime, Manga } from '@/api/anime';
import { Image, Pressable, Text, View } from '@/components/ui';

interface ContentCardProps {
  content: Anime | Manga;
  type: 'anime' | 'manga';
  onPress?: () => void;
}

export const ContentCard: React.FC<ContentCardProps> = ({
  content,
  type,
  onPress,
}) => {
  return (
    <Pressable
      onPress={onPress}
      className="mr-4 w-44 overflow-hidden rounded-2xl shadow-lg"
    >
      <View className="relative h-64">
        <Image
          source={{ uri: content.coverImage }}
          className="absolute inset-0 size-full bg-gray-200"
          resizeMode="cover"
        />

        {/* Gradient overlay */}
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.6)', 'rgba(0,0,0,0.9)']}
          locations={[0, 0.3, 1]}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
          }}
        />

        {/* Modern Rating overlay */}
        <View className="absolute right-3 top-3 flex-row items-center rounded-lg bg-black/70 px-2 py-1">
          <View className="mr-1 size-1.5 rounded-full bg-yellow-400" />
          <Text className="text-xs font-bold text-white">{content.rating}</Text>
        </View>

        {/* Status indicator */}
        <View className="absolute left-3 top-3">
          <View
            className={`rounded-full px-2 py-1 ${
              content.status === 'ongoing'
                ? 'bg-green-500'
                : content.status === 'completed'
                  ? 'bg-blue-500'
                  : 'bg-gray-500'
            }`}
          >
            <Text className="text-xs font-bold uppercase text-white">
              {content.status}
            </Text>
          </View>
        </View>

        {/* Content info overlay */}
        <View className="absolute inset-x-0 bottom-0 p-3">
          <Text className="mb-1 text-sm font-bold text-white" numberOfLines={2}>
            {content.title}
          </Text>

          <Text className="mb-2 text-xs text-white/70" numberOfLines={1}>
            {type === 'anime'
              ? (content as Anime).studio
              : (content as Manga).author}
          </Text>

          <View className="flex-row flex-wrap">
            {content.genres.slice(0, 2).map((genre, index) => (
              <View
                key={index}
                className="mb-1 mr-1 rounded-full bg-white/20 px-2 py-0.5"
              >
                <Text className="text-xs font-medium text-white">{genre}</Text>
              </View>
            ))}
          </View>
        </View>
      </View>
    </Pressable>
  );
};
