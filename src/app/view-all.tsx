import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';

import { mockAnime, mockManga } from '@/api/anime';
import { ContentCard } from '@/components/content-card';
import {
  FocusAwareStatusBar,
  Pressable,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from '@/components/ui';
import { ArrowLeft } from '@/components/ui/icons';

export default function ViewAll() {
  const router = useRouter();
  const { category, type } = useLocalSearchParams<{
    category: string;
    type: 'anime' | 'manga';
  }>();

  const getPageData = () => {
    const isAnime = type === 'anime';
    const content = isAnime ? mockAnime : mockManga;

    let title = '';
    let description = '';

    switch (category) {
      case 'trending':
        title = `Trending ${isAnime ? 'Anime' : 'Manga'}`;
        description = `Most ${isAnime ? 'watched' : 'read'} this week`;
        break;
      case 'popular':
        title = `Popular ${isAnime ? 'Anime' : 'Manga'}`;
        description = 'Top rated this month';
        break;
      default:
        title = `All ${isAnime ? 'Anime' : 'Manga'}`;
        description = 'Complete collection';
    }

    return { content, title, description };
  };

  const { content, title, description } = getPageData();

  const handleContentPress = (id: string, contentType: 'anime' | 'manga') => {
    router.push(`/detail/${id}?type=${contentType}`);
  };

  return (
    <>
      <FocusAwareStatusBar />
      <SafeAreaView className="flex-1 bg-gray-900">
        {/* Header */}
        <View className="flex-row items-center px-6 py-4">
          <Pressable onPress={() => router.back()} className="mr-4">
            <ArrowLeft color="#FFFFFF" />
          </Pressable>
          <View className="flex-1">
            <Text className="text-2xl font-bold text-white">{title}</Text>
            <Text className="text-sm text-gray-400">{description}</Text>
          </View>
        </View>

        {/* Content Grid */}
        <ScrollView
          className="flex-1 px-6"
          showsVerticalScrollIndicator={false}
        >
          <View className="mb-4 flex-row items-center justify-between">
            <Text className="text-lg font-medium text-white">
              {content.length} items
            </Text>
          </View>

          <View className="flex-row flex-wrap justify-between">
            {content.map((item) => (
              <View key={item.id} className="mb-4 w-[48%]">
                <ContentCard
                  content={item}
                  type={type}
                  onPress={() => handleContentPress(item.id, type)}
                />
              </View>
            ))}
          </View>

          <View className="h-8" />
        </ScrollView>
      </SafeAreaView>
    </>
  );
}
