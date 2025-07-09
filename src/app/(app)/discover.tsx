import { useRouter } from 'expo-router';
import React from 'react';

import {
  mockChallenges,
  mockLeaderboard,
  mockRecommendations,
  mockUserProfile,
} from '@/api/gamification';
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
import {
  Award,
  Calendar,
  Crown,
  Target,
  TrendingUp,
  Users,
} from '@/components/ui/icons';

export default function Discover() {
  const router = useRouter();

  const handleContentPress = (id: string, type: 'anime' | 'manga') => {
    router.push(`/detail/${id}?type=${type}`);
  };

  const getTimeRemaining = (deadline: string) => {
    const now = new Date();
    const end = new Date(deadline);
    const diff = end.getTime() - now.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    return hours > 0 ? `${hours}h remaining` : 'Ending soon';
  };

  const getChallengeIcon = (category: string) => {
    switch (category) {
      case 'reading':
        return <Target color="#10B981" size={20} />;
      case 'discovery':
        return <TrendingUp color="#3B82F6" size={20} />;
      case 'social':
        return <Users color="#8B5CF6" size={20} />;
      case 'completion':
        return <Award color="#F59E0B" size={20} />;
      default:
        return <Target color="#6B7280" size={20} />;
    }
  };

  const getChallengeColor = (category: string) => {
    switch (category) {
      case 'reading':
        return 'border-green-500 bg-green-500/10';
      case 'discovery':
        return 'border-blue-500 bg-blue-500/10';
      case 'social':
        return 'border-purple-500 bg-purple-500/10';
      case 'completion':
        return 'border-yellow-500 bg-yellow-500/10';
      default:
        return 'border-gray-500 bg-gray-500/10';
    }
  };

  return (
    <>
      <FocusAwareStatusBar />
      <SafeAreaView className="flex-1 bg-gray-900">
        <ScrollView className="px-6" showsVerticalScrollIndicator={false}>
          {/* Header */}
          <View className="flex-row items-center justify-between py-4">
            <View className="flex-1">
              <Text className="text-3xl font-bold text-white">Discover</Text>
              <Text className="mt-2 text-gray-400">
                Challenges, recommendations & more
              </Text>
            </View>

            <Pressable onPress={() => router.push('/profile')} className="ml-4">
              <Image
                source={{ uri: 'https://pic.re/image/80x80/profile-avatar' }}
                className="size-12 rounded-full bg-gray-700"
                resizeMode="cover"
              />
            </Pressable>
          </View>

          {/* User Progress Card */}
          <View className="mb-6 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 p-6">
            <View className="flex-row items-center justify-between">
              <View className="flex-1">
                <Text className="text-lg font-bold text-white">
                  Level {mockUserProfile.level}
                </Text>
                <Text className="text-sm text-blue-100">
                  {mockUserProfile.rank}
                </Text>
                <View className="mt-3 h-2 overflow-hidden rounded-full bg-white/20">
                  <View
                    className="h-full bg-white"
                    style={{
                      width: `${(mockUserProfile.xp / (mockUserProfile.xp + mockUserProfile.xpToNextLevel)) * 100}%`,
                    }}
                  />
                </View>
                <Text className="mt-1 text-xs text-blue-100">
                  {mockUserProfile.xpToNextLevel} XP to level{' '}
                  {mockUserProfile.level + 1}
                </Text>
              </View>
              <View className="ml-4 items-center">
                <Crown color="#FFD700" size={32} />
                <Text className="mt-1 text-sm font-bold text-white">
                  {mockUserProfile.xp} XP
                </Text>
              </View>
            </View>
          </View>

          {/* Daily Challenges */}
          <View className="mb-6">
            <View className="mb-4 flex-row items-center justify-between">
              <View className="flex-row items-center">
                <Calendar color="#10B981" size={24} />
                <Text className="ml-2 text-xl font-bold text-white">
                  Today&apos;s Challenges
                </Text>
              </View>
              <Text className="text-green-400">
                +
                {mockChallenges
                  .filter((c) => c.type === 'daily')
                  .reduce((acc, c) => acc + c.xpReward, 0)}{' '}
                XP
              </Text>
            </View>

            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {mockChallenges
                .filter((c) => c.type === 'daily')
                .map((challenge) => (
                  <View
                    key={challenge.id}
                    className={`mr-4 w-64 rounded-2xl border p-4 ${getChallengeColor(challenge.category)}`}
                  >
                    <View className="mb-3 flex-row items-center justify-between">
                      {getChallengeIcon(challenge.category)}
                      <Text className="text-xs font-medium text-gray-400">
                        {getTimeRemaining(challenge.deadline)}
                      </Text>
                    </View>

                    <Text className="mb-2 font-bold text-white">
                      {challenge.name}
                    </Text>
                    <Text className="mb-3 text-sm text-gray-300">
                      {challenge.description}
                    </Text>

                    <View className="mb-2 flex-row items-center justify-between">
                      <Text className="text-sm font-medium text-gray-400">
                        {challenge.progress}/{challenge.target}
                      </Text>
                      <Text className="text-sm font-bold text-yellow-400">
                        +{challenge.xpReward} XP
                      </Text>
                    </View>

                    <View className="h-2 overflow-hidden rounded-full bg-gray-700">
                      <View
                        className="h-full bg-gradient-to-r from-green-400 to-blue-400"
                        style={{
                          width: `${(challenge.progress / challenge.target) * 100}%`,
                        }}
                      />
                    </View>
                  </View>
                ))}
            </ScrollView>
          </View>

          {/* Weekly Challenges */}
          <View className="mb-6">
            <View className="mb-4 flex-row items-center justify-between">
              <Text className="text-xl font-bold text-white">
                Weekly Challenges
              </Text>
              <Text className="text-purple-400">
                +
                {mockChallenges
                  .filter((c) => c.type === 'weekly')
                  .reduce((acc, c) => acc + c.xpReward, 0)}{' '}
                XP
              </Text>
            </View>

            {mockChallenges
              .filter((c) => c.type === 'weekly')
              .map((challenge) => (
                <View
                  key={challenge.id}
                  className={`mb-3 rounded-2xl border p-4 ${getChallengeColor(challenge.category)}`}
                >
                  <View className="flex-row items-start justify-between">
                    <View className="flex-1">
                      <View className="mb-2 flex-row items-center">
                        {getChallengeIcon(challenge.category)}
                        <Text className="ml-2 font-bold text-white">
                          {challenge.name}
                        </Text>
                      </View>
                      <Text className="mb-3 text-sm text-gray-300">
                        {challenge.description}
                      </Text>

                      <View className="flex-row items-center justify-between">
                        <View className="flex-1">
                          <View className="mb-1 flex-row items-center justify-between">
                            <Text className="text-sm font-medium text-gray-400">
                              {challenge.progress}/{challenge.target}
                            </Text>
                            <Text className="text-sm font-bold text-yellow-400">
                              +{challenge.xpReward} XP
                            </Text>
                          </View>
                          <View className="h-2 overflow-hidden rounded-full bg-gray-700">
                            <View
                              className="h-full bg-gradient-to-r from-purple-400 to-pink-400"
                              style={{
                                width: `${(challenge.progress / challenge.target) * 100}%`,
                              }}
                            />
                          </View>
                        </View>
                      </View>
                    </View>
                  </View>
                </View>
              ))}
          </View>

          {/* Recommendations */}
          <View className="mb-6">
            <View className="mb-4 flex-row items-center justify-between">
              <Text className="text-xl font-bold text-white">
                Recommended for You
              </Text>
              <Text className="text-blue-400">AI Powered</Text>
            </View>

            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {mockRecommendations.map((rec) => (
                <View key={rec.id} className="mr-4">
                  <ContentCard
                    content={rec.content}
                    type={rec.type}
                    onPress={() => handleContentPress(rec.content.id, rec.type)}
                  />
                  <View className="mt-2 w-44">
                    <Text className="text-xs font-medium text-green-400">
                      {rec.confidence}% match
                    </Text>
                    <Text className="text-xs text-gray-400" numberOfLines={2}>
                      {rec.reason}
                    </Text>
                  </View>
                </View>
              ))}
            </ScrollView>
          </View>

          {/* Leaderboard Preview */}
          <View className="mb-8">
            <View className="mb-4 flex-row items-center justify-between">
              <View className="flex-row items-center">
                <Crown color="#FFD700" size={24} />
                <Text className="ml-2 text-xl font-bold text-white">
                  Leaderboard
                </Text>
              </View>
              <Pressable onPress={() => router.push('/leaderboard')}>
                <Text className="text-yellow-400">View All</Text>
              </Pressable>
            </View>

            <View className="rounded-2xl bg-gray-800 p-4">
              {mockLeaderboard.slice(0, 5).map((entry) => (
                <View
                  key={entry.user.id}
                  className="mb-3 flex-row items-center justify-between last:mb-0"
                >
                  <View className="flex-row items-center">
                    <View
                      className={`mr-3 flex size-8 items-center justify-center rounded-full ${
                        entry.rank === 1
                          ? 'bg-yellow-500'
                          : entry.rank === 2
                            ? 'bg-gray-400'
                            : entry.rank === 3
                              ? 'bg-orange-500'
                              : 'bg-gray-600'
                      }`}
                    >
                      <Text className="text-sm font-bold text-white">
                        {entry.rank}
                      </Text>
                    </View>
                    <Image
                      source={{ uri: entry.user.avatar }}
                      className="mr-3 size-10 rounded-full bg-gray-700"
                      resizeMode="cover"
                    />
                    <View>
                      <Text className="font-medium text-white">
                        {entry.user.username}
                      </Text>
                      <Text className="text-sm text-gray-400">
                        Level {entry.user.level}
                      </Text>
                    </View>
                  </View>
                  <View className="items-end">
                    <Text className="font-bold text-white">
                      {entry.xp.toLocaleString()} XP
                    </Text>
                    <Text className="text-sm text-green-400">
                      +{entry.weeklyXp} this week
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
