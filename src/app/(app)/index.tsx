import { useRouter } from 'expo-router';
import React from 'react';

import { mockAnime, mockManga } from '@/api/anime';
import { mockUserProfile } from '@/api/gamification';
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
import { Award, Search, TrendingUp } from '@/components/ui/icons';

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
          <View className="px-6 py-4">
            {/* Top Row - Stats and Actions */}
            <View className="mb-4 flex-row items-center justify-between">
              {/* Gamification Stats */}
              <View className="flex-row items-center">
                {/* Level Badge */}
                <View className="mr-3 flex-row items-center rounded-full bg-gradient-to-r from-purple-500 to-blue-500 px-3 py-1">
                  <Text className="text-sm font-bold text-white">
                    LV {mockUserProfile.level}
                  </Text>
                </View>

                {/* XP Indicator */}
                <View className="mr-3 flex-row items-center rounded-full bg-blue-500/20 px-3 py-1">
                  <Award color="#3B82F6" size={14} />
                  <Text className="ml-1 text-sm font-bold text-blue-400">
                    {mockUserProfile.xp}
                  </Text>
                </View>

                {/* Streak Indicator */}
                <View className="flex-row items-center rounded-full bg-orange-500/20 px-3 py-1">
                  <TrendingUp color="#F97316" size={14} />
                  <Text className="ml-1 text-sm font-bold text-orange-400">
                    {mockUserProfile.streak}
                  </Text>
                </View>
              </View>

              {/* Actions */}
              <View className="flex-row items-center">
                {/* Search Icon */}
                <Pressable
                  onPress={() => router.push('/search')}
                  className="mr-3 rounded-full bg-gray-800 p-2.5"
                >
                  <Search color="#9CA3AF" size={20} />
                </Pressable>

                {/* Profile Avatar */}
                <Pressable onPress={() => router.push('/profile')}>
                  <Image
                    source={{
                      uri: 'https://pic.re/image/80x80/profile-avatar',
                    }}
                    className="size-10 rounded-full bg-gray-700"
                    resizeMode="cover"
                  />
                </Pressable>
              </View>
            </View>

            {/* Welcome Message */}
            <View>
              <Text className="text-2xl font-bold text-white">
                Good Evening
              </Text>
              <Text className="text-gray-400">
                Ready for your next adventure?
              </Text>
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
