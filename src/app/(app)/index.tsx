import React from 'react';

import { mockAnime, mockManga } from '@/api/anime';
import { AnimeCard } from '@/components/anime-card';
import { MangaCard } from '@/components/manga-card';
import {
  FocusAwareStatusBar,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from '@/components/ui';

export default function Home() {
  return (
    <>
      <FocusAwareStatusBar />
      <SafeAreaView className="flex-1">
        <ScrollView className="px-4">
          <View className="py-4">
            <Text className="text-center text-2xl font-bold">Animly</Text>
            <Text className="mt-2 text-center text-gray-600">
              Discover amazing anime and manga
            </Text>
          </View>

          <View className="mt-8">
            <Text className="mb-4 text-lg font-semibold">Popular Anime</Text>
            {mockAnime.map((anime) => (
              <AnimeCard
                key={anime.id}
                anime={anime}
                onPress={() => {
                  // TODO: Navigate to anime details
                  console.log('Anime pressed:', anime.title);
                }}
              />
            ))}
          </View>

          <View className="mt-4">
            <Text className="mb-4 text-lg font-semibold">Popular Manga</Text>
            {mockManga.map((manga) => (
              <MangaCard
                key={manga.id}
                manga={manga}
                onPress={() => {
                  // TODO: Navigate to manga details
                  console.log('Manga pressed:', manga.title);
                }}
              />
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}
