import { useRouter } from 'expo-router';
import React from 'react';

import { mockAnime, mockManga } from '@/api/anime';
import { ContentCard } from '@/components/content-card';
import { FeaturedCard } from '@/components/featured-card';
import {
  FocusAwareStatusBar,
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from '@/components/ui';
import { Search } from '@/components/ui/icons';

export default function Home() {
  const router = useRouter();

  // Get today's featured content
  const featuredContent = [
    { content: mockAnime[0], type: 'anime' as const }, // Attack on Titan
    { content: mockManga[0], type: 'manga' as const }, // Chainsaw Man
    { content: mockAnime[3], type: 'anime' as const }, // Demon Slayer
  ];

  const navigateToDetail = (id: string, type: 'anime' | 'manga') => {
    router.push(`/detail/${id}?type=${type}`);
  };

  const navigateToViewAll = (category: string, type: 'anime' | 'manga') => {
    router.push(`/view-all?category=${category}&type=${type}`);
  };

  return (
    <>
      <FocusAwareStatusBar />
      <SafeAreaView className="flex-1 bg-gray-900">
        <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
          {/* Header */}
          <View className="flex-row items-center justify-between px-6 py-4">
            <Text className="text-3xl font-bold text-white">Animly</Text>

            <View className="flex-row items-center">
              {/* Search Icon */}
              <Pressable
                onPress={() => router.push('/search')}
                className="mr-4 rounded-full bg-gray-800 p-3"
              >
                <Search color="#9CA3AF" size={24} />
              </Pressable>

              {/* Profile Avatar */}
              <Pressable onPress={() => router.push('/profile')}>
                <Image
                  source={{ uri: 'https://pic.re/image/80x80/profile-avatar' }}
                  className="size-12 rounded-full bg-gray-700"
                  resizeMode="cover"
                />
              </Pressable>
            </View>
          </View>

          {/* Today's Featured */}
          <View className="mb-6">
            <View className="mb-4 px-6">
              <Text className="text-xl font-bold text-white">
                Today&apos;s Pick
              </Text>
              <Text className="text-gray-400">Handpicked just for you</Text>
            </View>

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              pagingEnabled
              snapToInterval={320}
              decelerationRate="fast"
            >
              {featuredContent.map((item, index) => (
                <FeaturedCard
                  key={index}
                  content={item.content}
                  type={item.type}
                  onPress={() => {
                    navigateToDetail(item.content.id, item.type);
                  }}
                />
              ))}
            </ScrollView>
          </View>

          {/* Trending Anime */}
          <View className="mb-6">
            <View className="mb-4 flex-row items-center justify-between px-6">
              <View>
                <Text className="text-xl font-bold text-white">
                  Trending Anime
                </Text>
                <Text className="text-gray-400">Most watched this week</Text>
              </View>
              <Pressable onPress={() => navigateToViewAll('trending', 'anime')}>
                <Text className="text-blue-400">View All</Text>
              </Pressable>
            </View>

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              className="pl-6"
            >
              {mockAnime.map((anime) => (
                <ContentCard
                  key={anime.id}
                  content={anime}
                  type="anime"
                  onPress={() => {
                    navigateToDetail(anime.id, 'anime');
                  }}
                />
              ))}
            </ScrollView>
          </View>

          {/* Popular Manga */}
          <View className="mb-6">
            <View className="mb-4 flex-row items-center justify-between px-6">
              <View>
                <Text className="text-xl font-bold text-white">
                  Popular Manga
                </Text>
                <Text className="text-gray-400">Top rated this month</Text>
              </View>
              <Pressable onPress={() => navigateToViewAll('popular', 'manga')}>
                <Text className="text-green-400">View All</Text>
              </Pressable>
            </View>

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              className="pl-6"
            >
              {mockManga.map((manga) => (
                <ContentCard
                  key={manga.id}
                  content={manga}
                  type="manga"
                  onPress={() => {
                    navigateToDetail(manga.id, 'manga');
                  }}
                />
              ))}
            </ScrollView>
          </View>

          {/* Recently Added */}
          <View className="mb-8">
            <View className="mb-4 px-6">
              <Text className="text-xl font-bold text-white">
                Recently Added
              </Text>
              <Text className="text-gray-400">Fresh content updates</Text>
            </View>

            <FeaturedCard
              content={mockManga[1]}
              type="manga"
              onPress={() => {
                navigateToDetail(mockManga[1].id, 'manga');
              }}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}
