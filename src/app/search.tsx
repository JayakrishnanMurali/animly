import { useRouter } from 'expo-router';
import React, { useState } from 'react';

import { mockAnime, mockManga } from '@/api/anime';
import { ContentCard } from '@/components/content-card';
import {
  FocusAwareStatusBar,
  Input,
  Pressable,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from '@/components/ui';
import { ArrowLeft, Filter, Search as SearchIcon } from '@/components/ui/icons';

const genres = [
  'All',
  'Action',
  'Adventure',
  'Comedy',
  'Drama',
  'Fantasy',
  'Horror',
  'Romance',
  'Sci-Fi',
  'Slice of Life',
  'Supernatural',
];

const types = ['All', 'Anime', 'Manga'];
const statuses = ['All', 'Ongoing', 'Completed', 'Hiatus'];

export default function Search() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('All');
  const [selectedType, setSelectedType] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [showFilters, setShowFilters] = useState(false);

  // Combine anime and manga for search
  const allContent = [
    ...mockAnime.map((item) => ({ ...item, contentType: 'anime' as const })),
    ...mockManga.map((item) => ({ ...item, contentType: 'manga' as const })),
  ];

  // Filter content based on search criteria
  const filteredContent = allContent.filter((item) => {
    const matchesQuery =
      searchQuery === '' ||
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.genres.some((genre) =>
        genre.toLowerCase().includes(searchQuery.toLowerCase())
      );

    const matchesGenre =
      selectedGenre === 'All' || item.genres.includes(selectedGenre);

    const matchesType =
      selectedType === 'All' ||
      item.contentType.toLowerCase() === selectedType.toLowerCase();

    const matchesStatus =
      selectedStatus === 'All' ||
      item.status.toLowerCase() === selectedStatus.toLowerCase();

    return matchesQuery && matchesGenre && matchesType && matchesStatus;
  });

  const handleContentPress = (id: string, type: 'anime' | 'manga') => {
    router.push(`/detail/${id}?type=${type}`);
  };

  const FilterChip = ({
    label,
    selected,
    onPress,
  }: {
    label: string;
    selected: boolean;
    onPress: () => void;
  }) => (
    <Pressable
      onPress={onPress}
      className={`mb-2 mr-2 rounded-full px-4 py-2 ${
        selected ? 'bg-blue-600' : 'bg-gray-800'
      }`}
    >
      <Text
        className={`text-sm font-medium ${
          selected ? 'text-white' : 'text-gray-300'
        }`}
      >
        {label}
      </Text>
    </Pressable>
  );

  return (
    <>
      <FocusAwareStatusBar />
      <SafeAreaView className="flex-1 bg-gray-900">
        {/* Header */}
        <View className="flex-row items-center px-6 py-4">
          <Pressable onPress={() => router.back()} className="mr-4">
            <ArrowLeft color="#FFFFFF" />
          </Pressable>
          <Text className="flex-1 text-2xl font-bold text-white">Search</Text>
          <Pressable
            onPress={() => setShowFilters(!showFilters)}
            className={`rounded-full p-2 ${
              showFilters ? 'bg-blue-600' : 'bg-gray-800'
            }`}
          >
            <Filter color="#FFFFFF" />
          </Pressable>
        </View>

        {/* Search Input */}
        <View className="mx-6 mb-4 flex-row items-center rounded-2xl bg-gray-800 px-4 py-3">
          <SearchIcon color="#9CA3AF" />
          <Input
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Search anime, manga, or genres..."
            placeholderTextColor="#9CA3AF"
            className="ml-3 flex-1 border-0 bg-transparent text-base text-white"
            autoFocus
          />
        </View>

        {/* Filters */}
        {showFilters && (
          <View className="mx-6 mb-4 rounded-2xl bg-gray-800 p-4">
            {/* Type Filter */}
            <View className="mb-4">
              <Text className="mb-3 text-sm font-medium uppercase tracking-wide text-gray-400">
                Type
              </Text>
              <View className="flex-row flex-wrap">
                {types.map((type) => (
                  <FilterChip
                    key={type}
                    label={type}
                    selected={selectedType === type}
                    onPress={() => setSelectedType(type)}
                  />
                ))}
              </View>
            </View>

            {/* Status Filter */}
            <View className="mb-4">
              <Text className="mb-3 text-sm font-medium uppercase tracking-wide text-gray-400">
                Status
              </Text>
              <View className="flex-row flex-wrap">
                {statuses.map((status) => (
                  <FilterChip
                    key={status}
                    label={status}
                    selected={selectedStatus === status}
                    onPress={() => setSelectedStatus(status)}
                  />
                ))}
              </View>
            </View>

            {/* Genre Filter */}
            <View>
              <Text className="mb-3 text-sm font-medium uppercase tracking-wide text-gray-400">
                Genre
              </Text>
              <View className="flex-row flex-wrap">
                {genres.map((genre) => (
                  <FilterChip
                    key={genre}
                    label={genre}
                    selected={selectedGenre === genre}
                    onPress={() => setSelectedGenre(genre)}
                  />
                ))}
              </View>
            </View>
          </View>
        )}

        {/* Results */}
        <ScrollView
          className="flex-1 px-6"
          showsVerticalScrollIndicator={false}
        >
          {searchQuery === '' && !showFilters ? (
            /* Empty State */
            <View className="flex-1 items-center justify-center py-20">
              <SearchIcon color="#6B7280" size={64} />
              <Text className="mt-4 text-xl font-medium text-gray-400">
                Start typing to search
              </Text>
              <Text className="mt-2 text-center text-gray-500">
                Find your favorite anime and manga{'\n'}or discover something
                new
              </Text>
            </View>
          ) : (
            <>
              {/* Results Header */}
              <View className="mb-4 flex-row items-center justify-between">
                <Text className="text-lg font-medium text-white">
                  {filteredContent.length} results
                </Text>
                {(selectedGenre !== 'All' ||
                  selectedType !== 'All' ||
                  selectedStatus !== 'All') && (
                  <Pressable
                    onPress={() => {
                      setSelectedGenre('All');
                      setSelectedType('All');
                      setSelectedStatus('All');
                    }}
                    className="rounded-full bg-gray-800 px-3 py-1"
                  >
                    <Text className="text-sm text-gray-300">Clear Filters</Text>
                  </Pressable>
                )}
              </View>

              {/* Results Grid */}
              <View className="flex-row flex-wrap justify-between">
                {filteredContent.map((item) => (
                  <View
                    key={`${item.contentType}-${item.id}`}
                    className="mb-4 w-[48%]"
                  >
                    <ContentCard
                      content={item}
                      type={item.contentType}
                      onPress={() =>
                        handleContentPress(item.id, item.contentType)
                      }
                    />
                  </View>
                ))}
              </View>

              {filteredContent.length === 0 && (
                <View className="flex-1 items-center justify-center py-20">
                  <Text className="text-xl font-medium text-gray-400">
                    No results found
                  </Text>
                  <Text className="mt-2 text-center text-gray-500">
                    Try adjusting your search terms{'\n'}or filters
                  </Text>
                </View>
              )}
            </>
          )}
        </ScrollView>
      </SafeAreaView>
    </>
  );
}
