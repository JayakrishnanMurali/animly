import { useRouter } from 'expo-router';
import React, { useState } from 'react';

import { mockLeaderboard } from '@/api/gamification';
import {
  FocusAwareStatusBar,
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from '@/components/ui';
import { ArrowLeft, Crown, TrendingUp } from '@/components/ui/icons';

export default function Leaderboard() {
  const router = useRouter();
  const [timeframe, setTimeframe] = useState<'weekly' | 'monthly' | 'alltime'>(
    'weekly'
  );

  const getLeaderboardData = () => {
    // In a real app, this would filter based on timeframe
    return mockLeaderboard;
  };

  const getRankIcon = (rank: number) => {
    if (rank === 1) return '🥇';
    if (rank === 2) return '🥈';
    if (rank === 3) return '🥉';
    return `${rank}`;
  };

  const getRankColor = (rank: number) => {
    if (rank === 1) return 'bg-yellow-500';
    if (rank === 2) return 'bg-gray-400';
    if (rank === 3) return 'bg-orange-500';
    return 'bg-gray-600';
  };

  const timeframes = [
    { key: 'weekly', label: 'This Week' },
    { key: 'monthly', label: 'This Month' },
    { key: 'alltime', label: 'All Time' },
  ];

  return (
    <>
      <FocusAwareStatusBar />
      <SafeAreaView className="flex-1 bg-gray-900">
        {/* Header */}
        <View className="flex-row items-center px-6 py-4">
          <Pressable onPress={() => router.back()} className="mr-4">
            <ArrowLeft color="#FFFFFF" />
          </Pressable>
          <View className="flex-1 flex-row items-center">
            <Crown color="#FFD700" size={24} />
            <Text className="ml-2 text-2xl font-bold text-white">
              Leaderboard
            </Text>
          </View>
        </View>

        {/* Timeframe Selector */}
        <View className="mx-6 mb-6 flex-row rounded-2xl bg-gray-800 p-1">
          {timeframes.map((tf) => (
            <Pressable
              key={tf.key}
              onPress={() => setTimeframe(tf.key as any)}
              className={`flex-1 rounded-xl py-3 ${
                timeframe === tf.key ? 'bg-blue-600' : 'bg-transparent'
              }`}
            >
              <Text
                className={`text-center text-sm font-medium ${
                  timeframe === tf.key ? 'text-white' : 'text-gray-400'
                }`}
              >
                {tf.label}
              </Text>
            </Pressable>
          ))}
        </View>

        {/* Top 3 Podium */}
        <View className="mx-6 mb-6">
          <View className="flex-row items-end justify-center">
            {/* 2nd Place */}
            <View className="mx-2 items-center">
              <View className="relative">
                <Image
                  source={{ uri: mockLeaderboard[1].user.avatar }}
                  className="size-16 rounded-full bg-gray-700"
                  resizeMode="cover"
                />
                <View className="absolute -right-2 -top-2 flex size-8 items-center justify-center rounded-full bg-gray-400">
                  <Text className="text-sm font-bold text-white">2</Text>
                </View>
              </View>
              <Text className="mt-2 text-sm font-bold text-white">
                {mockLeaderboard[1].user.username}
              </Text>
              <Text className="text-xs text-gray-400">
                {mockLeaderboard[1].xp.toLocaleString()} XP
              </Text>
              <View className="mt-2 h-20 w-16 rounded-t-lg bg-gray-600" />
            </View>

            {/* 1st Place */}
            <View className="mx-2 items-center">
              <View className="relative">
                <Image
                  source={{ uri: mockLeaderboard[0].user.avatar }}
                  className="size-20 rounded-full bg-gray-700"
                  resizeMode="cover"
                />
                <View className="absolute -right-2 -top-2 flex size-10 items-center justify-center rounded-full bg-yellow-500">
                  <Crown color="#FFFFFF" size={16} />
                </View>
              </View>
              <Text className="mt-2 text-base font-bold text-white">
                {mockLeaderboard[0].user.username}
              </Text>
              <Text className="text-sm text-yellow-400">
                {mockLeaderboard[0].xp.toLocaleString()} XP
              </Text>
              <View className="mt-2 h-24 w-16 rounded-t-lg bg-yellow-500" />
            </View>

            {/* 3rd Place */}
            <View className="mx-2 items-center">
              <View className="relative">
                <Image
                  source={{ uri: mockLeaderboard[2].user.avatar }}
                  className="size-16 rounded-full bg-gray-700"
                  resizeMode="cover"
                />
                <View className="absolute -right-2 -top-2 flex size-8 items-center justify-center rounded-full bg-orange-500">
                  <Text className="text-sm font-bold text-white">3</Text>
                </View>
              </View>
              <Text className="mt-2 text-sm font-bold text-white">
                {mockLeaderboard[2].user.username}
              </Text>
              <Text className="text-xs text-gray-400">
                {mockLeaderboard[2].xp.toLocaleString()} XP
              </Text>
              <View className="mt-2 size-16 rounded-t-lg bg-orange-500" />
            </View>
          </View>
        </View>

        {/* Full Leaderboard */}
        <ScrollView
          className="flex-1 px-6"
          showsVerticalScrollIndicator={false}
        >
          <View className="mb-4 flex-row items-center justify-between">
            <Text className="text-lg font-bold text-white">All Rankings</Text>
            <View className="flex-row items-center">
              <TrendingUp color="#10B981" size={16} />
              <Text className="ml-1 text-sm text-green-400">Live Updates</Text>
            </View>
          </View>

          <View className="rounded-2xl bg-gray-800 p-4">
            {getLeaderboardData().map((entry, index) => (
              <View
                key={entry.user.id}
                className={`mb-4 flex-row items-center justify-between last:mb-0 ${
                  entry.user.id === '1' ? 'rounded-lg bg-blue-500/20 p-3' : ''
                }`}
              >
                <View className="flex-row items-center">
                  <View
                    className={`mr-4 flex size-10 items-center justify-center rounded-full ${getRankColor(entry.rank)}`}
                  >
                    <Text className="text-sm font-bold text-white">
                      {entry.rank <= 3 ? getRankIcon(entry.rank) : entry.rank}
                    </Text>
                  </View>

                  <Image
                    source={{ uri: entry.user.avatar }}
                    className="mr-4 size-12 rounded-full bg-gray-700"
                    resizeMode="cover"
                  />

                  <View>
                    <View className="flex-row items-center">
                      <Text className="font-bold text-white">
                        {entry.user.username}
                      </Text>
                      {entry.user.id === '1' && (
                        <Text className="ml-2 text-xs text-blue-400">
                          (You)
                        </Text>
                      )}
                    </View>
                    <Text className="text-sm text-gray-400">
                      Level {entry.user.level}
                    </Text>
                  </View>
                </View>

                <View className="items-end">
                  <Text className="font-bold text-white">
                    {entry.xp.toLocaleString()}
                  </Text>
                  <Text className="text-sm text-green-400">
                    +{entry.weeklyXp} this week
                  </Text>
                </View>
              </View>
            ))}
          </View>

          <View className="h-8" />
        </ScrollView>
      </SafeAreaView>
    </>
  );
}
