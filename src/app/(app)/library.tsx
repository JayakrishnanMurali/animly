import React from 'react';

import {
  FocusAwareStatusBar,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from '@/components/ui';

export default function Library() {
  return (
    <>
      <FocusAwareStatusBar />
      <SafeAreaView className="flex-1 bg-gray-900">
        <ScrollView className="px-6">
          <View className="py-4">
            <Text className="text-3xl font-bold text-white">My Library</Text>
            <Text className="mt-2 text-gray-400">
              Your anime and manga collection
            </Text>
          </View>

          <View className="mt-8">
            <View className="mb-4 flex-row items-center justify-between">
              <Text className="text-xl font-bold text-white">
                Currently Reading
              </Text>
              <Text className="text-green-400">0</Text>
            </View>
            <View className="mb-4 rounded-2xl bg-gray-800 p-6">
              <Text className="text-center text-gray-400">
                No manga in progress
              </Text>
              <Text className="mt-2 text-center text-sm text-gray-500">
                Start reading to track your progress
              </Text>
            </View>
          </View>

          <View className="mt-4">
            <View className="mb-4 flex-row items-center justify-between">
              <Text className="text-xl font-bold text-white">
                Currently Watching
              </Text>
              <Text className="text-blue-400">0</Text>
            </View>
            <View className="mb-4 rounded-2xl bg-gray-800 p-6">
              <Text className="text-center text-gray-400">
                No anime in progress
              </Text>
              <Text className="mt-2 text-center text-sm text-gray-500">
                Start watching to track your progress
              </Text>
            </View>
          </View>

          <View className="mt-4">
            <View className="mb-4 flex-row items-center justify-between">
              <Text className="text-xl font-bold text-white">Favorites</Text>
              <Text className="text-yellow-400">0</Text>
            </View>
            <View className="mb-4 rounded-2xl bg-gray-800 p-6">
              <Text className="text-center text-gray-400">
                No favorites yet
              </Text>
              <Text className="mt-2 text-center text-sm text-gray-500">
                Add content to your favorites to see them here
              </Text>
            </View>
          </View>

          <View className="mt-4">
            <View className="mb-4 flex-row items-center justify-between">
              <Text className="text-xl font-bold text-white">Quick Stats</Text>
            </View>
            <View className="mb-4 rounded-2xl bg-gray-800 p-6">
              <View className="flex-row justify-between">
                <View className="items-center">
                  <Text className="text-2xl font-bold text-blue-400">0</Text>
                  <Text className="text-sm text-gray-400">Anime Watched</Text>
                </View>
                <View className="items-center">
                  <Text className="text-2xl font-bold text-green-400">0</Text>
                  <Text className="text-sm text-gray-400">Manga Read</Text>
                </View>
                <View className="items-center">
                  <Text className="text-2xl font-bold text-yellow-400">0</Text>
                  <Text className="text-sm text-gray-400">Hours Spent</Text>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}
