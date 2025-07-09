import { useRouter } from 'expo-router';
import React from 'react';

import { mockAnime, mockManga } from '@/api/anime';
import { ContentCard } from '@/components/content-card';
import {
  FocusAwareStatusBar,
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from '@/components/ui';

export default function Library() {
  const router = useRouter();
  const totalAnime = mockAnime.length;
  const totalManga = mockManga.length;
  const totalHours = Math.floor(Math.random() * 120) + 20; // Mock reading hours

  const handleContentPress = (id: string, type: 'anime' | 'manga') => {
    router.push(`/detail/${id}?type=${type}`);
  };

  return (
    <>
      <FocusAwareStatusBar />
      <SafeAreaView className="flex-1 bg-gray-900">
        <ScrollView className="px-6" showsVerticalScrollIndicator={false}>
          <View className="flex-row items-center justify-between py-4">
            <View className="flex-1">
              <Text className="text-3xl font-bold text-white">My Library</Text>
              <Text className="mt-2 text-gray-400">
                Your anime and manga collection
              </Text>
            </View>

            {/* Profile Avatar */}
            <Pressable onPress={() => router.push('/profile')} className="ml-4">
              <Image
                source={{ uri: 'https://pic.re/image/80x80/profile-avatar' }}
                className="size-12 rounded-full bg-gray-700"
                resizeMode="cover"
              />
            </Pressable>
          </View>

          {/* Quick Stats */}
          <View className="mt-6">
            <View className="mb-4 flex-row items-center justify-between">
              <Text className="text-xl font-bold text-white">
                Reading Stats
              </Text>
            </View>
            <View className="mb-6 rounded-2xl bg-gray-800 p-6">
              <View className="flex-row justify-between">
                <View className="items-center">
                  <Text className="text-2xl font-bold text-blue-400">
                    {totalAnime}
                  </Text>
                  <Text className="text-sm text-gray-400">Anime</Text>
                </View>
                <View className="items-center">
                  <Text className="text-2xl font-bold text-green-400">
                    {totalManga}
                  </Text>
                  <Text className="text-sm text-gray-400">Manga</Text>
                </View>
                <View className="items-center">
                  <Text className="text-2xl font-bold text-yellow-400">
                    {totalHours}
                  </Text>
                  <Text className="text-sm text-gray-400">Hours Read</Text>
                </View>
              </View>
            </View>
          </View>

          {/* Currently Reading */}
          <View className="mt-4">
            <View className="mb-4 flex-row items-center justify-between">
              <Text className="text-xl font-bold text-white">
                Currently Reading
              </Text>
              <Text className="text-green-400">2</Text>
            </View>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              className="mb-6"
            >
              <ContentCard
                content={mockManga[0]}
                type="manga"
                onPress={() => handleContentPress(mockManga[0].id, 'manga')}
              />
              <ContentCard
                content={mockManga[1]}
                type="manga"
                onPress={() => handleContentPress(mockManga[1].id, 'manga')}
              />
            </ScrollView>
          </View>

          {/* Favorites */}
          <View className="mt-4">
            <View className="mb-4 flex-row items-center justify-between">
              <Text className="text-xl font-bold text-white">Favorites</Text>
              <Text className="text-yellow-400">3</Text>
            </View>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              className="mb-6"
            >
              <ContentCard
                content={mockAnime[0]}
                type="anime"
                onPress={() => handleContentPress(mockAnime[0].id, 'anime')}
              />
              <ContentCard
                content={mockManga[4]}
                type="manga"
                onPress={() => handleContentPress(mockManga[4].id, 'manga')}
              />
              <ContentCard
                content={mockAnime[6]}
                type="anime"
                onPress={() => handleContentPress(mockAnime[6].id, 'anime')}
              />
            </ScrollView>
          </View>

          {/* Plan to Read */}
          <View className="mt-4">
            <View className="mb-4 flex-row items-center justify-between">
              <Text className="text-xl font-bold text-white">Plan to Read</Text>
              <Text className="text-purple-400">4</Text>
            </View>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              className="mb-6"
            >
              <ContentCard
                content={mockManga[2]}
                type="manga"
                onPress={() => handleContentPress(mockManga[2].id, 'manga')}
              />
              <ContentCard
                content={mockAnime[3]}
                type="anime"
                onPress={() => handleContentPress(mockAnime[3].id, 'anime')}
              />
              <ContentCard
                content={mockManga[6]}
                type="manga"
                onPress={() => handleContentPress(mockManga[6].id, 'manga')}
              />
              <ContentCard
                content={mockAnime[7]}
                type="anime"
                onPress={() => handleContentPress(mockAnime[7].id, 'anime')}
              />
            </ScrollView>
          </View>

          {/* Reading History */}
          <View className="mt-4 pb-8">
            <View className="mb-4 flex-row items-center justify-between">
              <Text className="text-xl font-bold text-white">
                Recently Read
              </Text>
              <Text className="text-gray-400">View All</Text>
            </View>
            <View className="rounded-2xl bg-gray-800 p-6">
              {[
                {
                  title: 'Chainsaw Man - Chapter 97',
                  time: '2 hours ago',
                  type: 'manga',
                },
                {
                  title: 'Attack on Titan - Episode 87',
                  time: '1 day ago',
                  type: 'anime',
                },
                {
                  title: 'Berserk - Chapter 370',
                  time: '3 days ago',
                  type: 'manga',
                },
                {
                  title: 'Hunter x Hunter - Episode 148',
                  time: '1 week ago',
                  type: 'anime',
                },
              ].map((item, index) => (
                <View
                  key={index}
                  className="mb-4 flex-row items-center justify-between last:mb-0"
                >
                  <View className="flex-1">
                    <Text className="font-medium text-white" numberOfLines={1}>
                      {item.title}
                    </Text>
                    <Text className="text-sm text-gray-400">{item.time}</Text>
                  </View>
                  <View
                    className={`rounded-full px-2 py-1 ${
                      item.type === 'manga'
                        ? 'bg-green-500/20'
                        : 'bg-blue-500/20'
                    }`}
                  >
                    <Text
                      className={`text-xs font-medium ${
                        item.type === 'manga'
                          ? 'text-green-400'
                          : 'text-blue-400'
                      }`}
                    >
                      {item.type.toUpperCase()}
                    </Text>
                  </View>
                </View>
              ))}
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}
