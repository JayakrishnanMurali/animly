import { LinearGradient } from 'expo-linear-gradient';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import { Dimensions } from 'react-native';

import type { Anime, Manga } from '@/api/anime';
import { mockAnime, mockManga } from '@/api/anime';
import {
  FocusAwareStatusBar,
  Image,
  Pressable,
  ScrollView,
  Text,
  View,
} from '@/components/ui';
import { ArrowLeft } from '@/components/ui/icons';

const { height: screenHeight } = Dimensions.get('window');

export default function DetailScreen() {
  const { id, type } = useLocalSearchParams<{
    id: string;
    type: 'anime' | 'manga';
  }>();
  const router = useRouter();

  // Find the content based on ID and type
  const content =
    type === 'anime'
      ? mockAnime.find((item) => item.id === id)
      : mockManga.find((item) => item.id === id);

  const getGenreColor = (genre: string) => {
    const colors: { [key: string]: string } = {
      Action: 'bg-red-600',
      Adventure: 'bg-orange-600',
      Comedy: 'bg-yellow-600',
      Drama: 'bg-purple-600',
      Fantasy: 'bg-indigo-600',
      Horror: 'bg-gray-600',
      Romance: 'bg-pink-600',
      'Sci-Fi': 'bg-cyan-600',
      'Slice of Life': 'bg-green-600',
      Supernatural: 'bg-violet-600',
      Thriller: 'bg-red-800',
      School: 'bg-blue-600',
      Superhero: 'bg-emerald-600',
      Historical: 'bg-amber-600',
      Family: 'bg-teal-600',
    };
    return colors[genre] || 'bg-blue-600';
  };

  if (!content) {
    return (
      <View className="flex-1 bg-gray-900">
        <Text className="text-center text-white">Content not found</Text>
      </View>
    );
  }

  const isAnime = type === 'anime';
  const animeContent = content as Anime;
  const mangaContent = content as Manga;

  return (
    <View className="flex-1 bg-gray-900">
      <FocusAwareStatusBar />
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Hero Section */}
        <View className="relative" style={{ height: screenHeight * 0.6 }}>
          <Image
            source={{ uri: content.bannerImage || content.coverImage }}
            className="absolute inset-0 size-full"
            resizeMode="cover"
          />

          {/* Multi-layer gradient overlay */}
          <LinearGradient
            colors={[
              'transparent',
              'rgba(0,0,0,0.3)',
              'rgba(0,0,0,0.8)',
              'rgba(0,0,0,0.95)',
            ]}
            locations={[0, 0.4, 0.7, 1]}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
            }}
          />
          <LinearGradient
            colors={['rgba(0,0,0,0.6)', 'transparent']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              bottom: 0,
              width: 160,
            }}
          />

          {/* Back button */}
          <Pressable
            onPress={() => router.back()}
            className="absolute left-6 top-16 z-10 rounded-full bg-black/60 p-4"
          >
            <ArrowLeft color="#FFFFFF" />
          </Pressable>

          {/* Content overlay */}
          <View className="absolute inset-x-0 bottom-0 p-6">
            {/* Title and rating */}
            <View className="mb-4">
              <View className="mb-2 flex-row items-center">
                <View className="mr-3 flex-row items-center rounded-xl bg-white/10 px-3 py-2 backdrop-blur-sm">
                  <View className="mr-1 size-2 rounded-full bg-yellow-400" />
                  <Text className="text-sm font-bold text-white">
                    {content.rating}
                  </Text>
                </View>
                <View
                  className={`rounded-full px-3 py-1 ${
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
                <View className="ml-3 rounded-full bg-white/20 px-3 py-1">
                  <Text className="text-xs font-bold uppercase text-white">
                    {type}
                  </Text>
                </View>
              </View>

              <Text className="mb-2 text-4xl font-bold text-white">
                {content.title}
              </Text>

              <Text className="text-lg text-white/80">
                {isAnime
                  ? animeContent.studio
                  : `${mangaContent.author} • ${mangaContent.artist}`}
              </Text>
            </View>

            {/* Action buttons */}
            <View className="flex-row">
              <Pressable className="mr-4 flex-1 rounded-full bg-blue-600 py-4">
                <Text className="text-center text-lg font-bold text-white">
                  {isAnime ? 'Start Watching' : 'Start Reading'}
                </Text>
                <Text className="text-center text-sm text-blue-200">
                  +{isAnime ? '15' : '10'} XP per{' '}
                  {isAnime ? 'episode' : 'chapter'}
                </Text>
              </Pressable>

              <Pressable className="rounded-full bg-white/20 px-6 py-4">
                <Text className="text-lg font-bold text-white">Follow</Text>
                <Text className="text-center text-xs text-gray-300">+5 XP</Text>
              </Pressable>
            </View>
          </View>
        </View>

        {/* Content Details */}
        <View className="px-6 py-8">
          {/* Synopsis */}
          <View className="mb-8">
            <Text className="mb-4 text-xl font-bold text-white">Synopsis</Text>
            <Text className="leading-6 text-gray-300">{content.synopsis}</Text>
          </View>

          {/* Genres */}
          <View className="mb-8">
            <Text className="mb-4 text-xl font-bold text-white">Genres</Text>
            <View className="flex-row flex-wrap">
              {content.genres.map((genre, index) => (
                <View
                  key={index}
                  className={`mb-2 mr-2 rounded-full px-4 py-2 ${getGenreColor(genre)}`}
                >
                  <Text className="font-medium text-white">{genre}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* Stats */}
          <View className="mb-8 rounded-2xl bg-gray-800 p-6">
            <Text className="mb-4 text-xl font-bold text-white">
              Information
            </Text>
            <View className="space-y-3">
              <View className="flex-row justify-between">
                <Text className="text-gray-400">Status</Text>
                <Text className="font-medium capitalize text-white">
                  {content.status}
                </Text>
              </View>
              <View className="flex-row justify-between">
                <Text className="text-gray-400">
                  {isAnime ? 'Episodes' : 'Chapters'}
                </Text>
                <Text className="font-medium text-white">
                  {isAnime
                    ? animeContent.totalEpisodes
                    : mangaContent.totalChapters}
                </Text>
              </View>
              <View className="flex-row justify-between">
                <Text className="text-gray-400">Release Date</Text>
                <Text className="font-medium text-white">
                  {new Date(content.releaseDate).getFullYear()}
                </Text>
              </View>
              {isAnime && (
                <>
                  <View className="flex-row justify-between">
                    <Text className="text-gray-400">Studio</Text>
                    <Text className="font-medium text-white">
                      {animeContent.studio}
                    </Text>
                  </View>
                  <View className="flex-row justify-between">
                    <Text className="text-gray-400">Duration</Text>
                    <Text className="font-medium text-white">
                      {animeContent.duration} min
                    </Text>
                  </View>
                </>
              )}
              {!isAnime && (
                <>
                  <View className="flex-row justify-between">
                    <Text className="text-gray-400">Author</Text>
                    <Text className="font-medium text-white">
                      {mangaContent.author}
                    </Text>
                  </View>
                  <View className="flex-row justify-between">
                    <Text className="text-gray-400">Demographic</Text>
                    <Text className="font-medium capitalize text-white">
                      {mangaContent.demographic}
                    </Text>
                  </View>
                </>
              )}
            </View>
          </View>

          {/* Similar content section placeholder */}
          <View className="mb-8">
            <Text className="mb-4 text-xl font-bold text-white">
              Similar {isAnime ? 'Anime' : 'Manga'}
            </Text>
            <View className="rounded-2xl bg-gray-800 p-6">
              <Text className="text-center text-gray-400">
                Similar content recommendations coming soon...
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
