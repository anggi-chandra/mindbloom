import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

import { useColorScheme } from '@/hooks/use-color-scheme';
import { Ionicons } from '@expo/vector-icons';

import FloatingMusicPlayer from '@/components/FloatingMusicPlayer';
import { MusicProvider } from '@/contexts/MusicContext';
import { View } from 'react-native';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <MusicProvider>
      <View style={{ flex: 1, position: 'relative' }}>
        <Tabs
          screenOptions={{
            tabBarActiveTintColor: '#333',
            tabBarInactiveTintColor: '#999',
            headerShown: false,
            tabBarStyle: Platform.select({
              ios: {
                position: 'absolute',
                bottom: 25,
                left: 20,
                right: 20,
                elevation: 0,
                backgroundColor: '#FFF5F5',
                borderRadius: 30,
                height: 70,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 5 },
                shadowOpacity: 0.1,
                shadowRadius: 10,
                borderTopWidth: 0,
                paddingBottom: 0,
                zIndex: 50,
              },
              default: {
                position: 'absolute',
                bottom: 25,
                left: 20,
                right: 20,
                elevation: 5,
                backgroundColor: '#FFF5F5',
                borderRadius: 30,
                height: 70,
                borderTopWidth: 0,
                paddingBottom: 0,
                zIndex: 50,
              },
            }),
            tabBarItemStyle: {
              paddingVertical: 10,
            },
            tabBarShowLabel: true,
            tabBarLabelStyle: {
              fontSize: 12,
              fontWeight: '500',
              marginBottom: 5,
            }
          }}>
          <Tabs.Screen
            name="index"
            options={{
              title: 'Home',
              tabBarIcon: ({ color, focused }) => <Ionicons name={focused ? "home" : "home-outline"} size={24} color={color} />,
            }}
          />
          <Tabs.Screen
            name="history"
            options={{
              title: 'History',
              tabBarIcon: ({ color, focused }) => <Ionicons name={focused ? "albums" : "albums-outline"} size={24} color={color} />,
            }}
          />
          <Tabs.Screen
            name="profile"
            options={{
              title: 'Profile',
              tabBarIcon: ({ color, focused }) => <Ionicons name={focused ? "person" : "person-outline"} size={24} color={color} />,
            }}
          />
          <Tabs.Screen
            name="weekly-mood"
            options={{
              href: null,
              headerShown: false,
            }}
          />
          <Tabs.Screen
            name="song-list"
            options={{
              href: null,
              headerShown: false,
            }}
          />
          <Tabs.Screen
            name="music-player"
            options={{
              href: null,
              headerShown: false,
              tabBarStyle: { display: 'none' },
            }}
          />
          <Tabs.Screen
            name="recommend-activities-list"
            options={{
              href: null,
              headerShown: false,
            }}
          />
        </Tabs>
        <FloatingMusicPlayer />
      </View>
    </MusicProvider>
  );
}
