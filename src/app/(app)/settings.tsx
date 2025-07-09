import React from 'react';

import {
  FocusAwareStatusBar,
  Pressable,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from '@/components/ui';
import {
  ArrowRight,
  Github,
  Rate,
  Share,
  Support,
  Website,
} from '@/components/ui/icons';
import { useAuth } from '@/lib';

interface SettingsItemProps {
  title: string;
  value?: string;
  onPress?: () => void;
  icon?: React.ReactNode;
  isDestructive?: boolean;
}

const SettingsItem: React.FC<SettingsItemProps> = ({
  title,
  value,
  onPress,
  icon,
  isDestructive = false,
}) => {
  const isPressable = onPress !== undefined;

  return (
    <Pressable
      onPress={onPress}
      className={`flex-row items-center justify-between p-4 ${
        isPressable ? 'active:bg-gray-700' : ''
      }`}
    >
      <View className="flex-1 flex-row items-center">
        {icon && <View className="mr-3">{icon}</View>}
        <Text
          className={`text-base ${isDestructive ? 'text-red-400' : 'text-white'}`}
        >
          {title}
        </Text>
      </View>
      <View className="flex-row items-center">
        {value && <Text className="mr-2 text-sm text-gray-400">{value}</Text>}
        {isPressable && <ArrowRight color="#9CA3AF" />}
      </View>
    </Pressable>
  );
};

interface SettingsSectionProps {
  title: string;
  children: React.ReactNode;
}

const SettingsSection: React.FC<SettingsSectionProps> = ({
  title,
  children,
}) => {
  return (
    <View className="mt-6">
      <Text className="mb-3 px-4 text-sm font-medium uppercase tracking-wide text-gray-400">
        {title}
      </Text>
      <View className="overflow-hidden rounded-2xl bg-gray-800">
        {children}
      </View>
    </View>
  );
};

export default function Settings() {
  const signOut = useAuth.use.signOut();
  const iconColor = '#9CA3AF';

  return (
    <>
      <FocusAwareStatusBar />
      <SafeAreaView className="flex-1 bg-gray-900">
        <ScrollView className="px-6" showsVerticalScrollIndicator={false}>
          <View className="py-4">
            <Text className="text-3xl font-bold text-white">Settings</Text>
            <Text className="mt-2 text-gray-400">
              Customize your reading experience
            </Text>
          </View>

          {/* Reading Preferences */}
          <SettingsSection title="Reading Preferences">
            <SettingsItem
              title="Reading Direction"
              value="Left to Right"
              onPress={() => {}}
            />
            <View className="h-px bg-gray-700" />
            <SettingsItem
              title="Page Transition"
              value="Slide"
              onPress={() => {}}
            />
            <View className="h-px bg-gray-700" />
            <SettingsItem
              title="Auto-mark as Read"
              value="On"
              onPress={() => {}}
            />
            <View className="h-px bg-gray-700" />
            <SettingsItem
              title="Download Quality"
              value="High"
              onPress={() => {}}
            />
          </SettingsSection>

          {/* Appearance */}
          <SettingsSection title="Appearance">
            <SettingsItem title="Theme" value="Dark" onPress={() => {}} />
            <View className="h-px bg-gray-700" />
            <SettingsItem title="Language" value="English" onPress={() => {}} />
            <View className="h-px bg-gray-700" />
            <SettingsItem
              title="Reader Background"
              value="Black"
              onPress={() => {}}
            />
          </SettingsSection>

          {/* Data & Storage */}
          <SettingsSection title="Data & Storage">
            <SettingsItem
              title="Clear Cache"
              value="2.1 GB"
              onPress={() => {}}
            />
            <View className="h-px bg-gray-700" />
            <SettingsItem
              title="Download Location"
              value="Internal"
              onPress={() => {}}
            />
            <View className="h-px bg-gray-700" />
            <SettingsItem
              title="Auto Download"
              value="Wi-Fi Only"
              onPress={() => {}}
            />
            <View className="h-px bg-gray-700" />
            <SettingsItem title="Backup & Sync" onPress={() => {}} />
          </SettingsSection>

          {/* Notifications */}
          <SettingsSection title="Notifications">
            <SettingsItem
              title="New Chapter Alerts"
              value="On"
              onPress={() => {}}
            />
            <View className="h-px bg-gray-700" />
            <SettingsItem
              title="Episode Releases"
              value="On"
              onPress={() => {}}
            />
            <View className="h-px bg-gray-700" />
            <SettingsItem
              title="Reading Reminders"
              value="Off"
              onPress={() => {}}
            />
          </SettingsSection>

          {/* Account */}
          <SettingsSection title="Account">
            <SettingsItem title="Profile" onPress={() => {}} />
            <View className="h-px bg-gray-700" />
            <SettingsItem title="Reading Statistics" onPress={() => {}} />
            <View className="h-px bg-gray-700" />
            <SettingsItem title="Export Data" onPress={() => {}} />
          </SettingsSection>

          {/* About */}
          <SettingsSection title="About">
            <SettingsItem title="App Name" value="Animly" />
            <View className="h-px bg-gray-700" />
            <SettingsItem title="Version" value="1.0.0" />
            <View className="h-px bg-gray-700" />
            <SettingsItem
              title="Rate App"
              icon={<Rate color={iconColor} />}
              onPress={() => {}}
            />
            <View className="h-px bg-gray-700" />
            <SettingsItem
              title="Share App"
              icon={<Share color={iconColor} />}
              onPress={() => {}}
            />
          </SettingsSection>

          {/* Support */}
          <SettingsSection title="Support">
            <SettingsItem
              title="Help & FAQ"
              icon={<Support color={iconColor} />}
              onPress={() => {}}
            />
            <View className="h-px bg-gray-700" />
            <SettingsItem title="Privacy Policy" onPress={() => {}} />
            <View className="h-px bg-gray-700" />
            <SettingsItem title="Terms of Service" onPress={() => {}} />
            <View className="h-px bg-gray-700" />
            <SettingsItem
              title="GitHub"
              icon={<Github color={iconColor} />}
              onPress={() => {}}
            />
            <View className="h-px bg-gray-700" />
            <SettingsItem
              title="Website"
              icon={<Website color={iconColor} />}
              onPress={() => {}}
            />
          </SettingsSection>

          <SettingsSection title="">
            <SettingsItem
              title="Sign Out"
              onPress={signOut}
              isDestructive={true}
            />
          </SettingsSection>

          <View className="h-8" />
        </ScrollView>
      </SafeAreaView>
    </>
  );
}
