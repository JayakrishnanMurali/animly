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
      <SafeAreaView className="flex-1">
        <ScrollView className="px-4">
          <View className="py-4">
            <Text className="text-center text-2xl font-bold">My Library</Text>
            <Text className="mt-2 text-center text-gray-600">
              Your anime and manga collection
            </Text>
          </View>

          <View className="mt-8">
            <Text className="mb-4 text-lg font-semibold">
              Currently Reading
            </Text>
            <View className="mb-4 rounded-lg bg-gray-100 p-4">
              <Text className="text-gray-500">No manga in progress</Text>
            </View>
          </View>

          <View className="mt-4">
            <Text className="mb-4 text-lg font-semibold">
              Currently Watching
            </Text>
            <View className="mb-4 rounded-lg bg-gray-100 p-4">
              <Text className="text-gray-500">No anime in progress</Text>
            </View>
          </View>

          <View className="mt-4">
            <Text className="mb-4 text-lg font-semibold">Favorites</Text>
            <View className="mb-4 rounded-lg bg-gray-100 p-4">
              <Text className="text-gray-500">No favorites yet</Text>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}
