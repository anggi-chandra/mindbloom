import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { useNavigation, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Dimensions, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

import Onboarding from '@/components/Onboarding';

const { width } = Dimensions.get('window');

// Global variable to persist state during the session (resets on reload)
let hasCompletedOnboardingSession = false;

export default function HomeScreen() {
  const [showOnboarding, setShowOnboarding] = useState(!hasCompletedOnboardingSession);
  const [userMood, setUserMood] = useState<string | null>(null);
  const navigation = useNavigation();
  const router = useRouter();

  useEffect(() => {
    if (showOnboarding) {
      navigation.setOptions({
        tabBarStyle: { display: 'none' },
      });
    } else {
      navigation.setOptions({
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
            display: 'flex',
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
            display: 'flex',
          },
        }),
      });
    }
  }, [showOnboarding, navigation]);

  const handleOnboardingComplete = (mood: string | null) => {
    setUserMood(mood);
    setShowOnboarding(false);
    hasCompletedOnboardingSession = true;
  };

  return (
    <View style={styles.container}>
      {showOnboarding && (
        <View style={[StyleSheet.absoluteFill, { zIndex: 100 }]}>
          <Onboarding onComplete={handleOnboardingComplete} />
        </View>
      )}
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Header Section */}
        <View style={styles.header}>
          <Image
            source={require('@/assets/images/homepagelogo.png')}
            style={styles.headerBackground}
            contentFit="contain"
          />
          <View style={styles.headerOverlay}>
            <View style={styles.logoPill}>
              <Ionicons name="leaf-outline" size={16} color="#E89898" />
              <Text style={styles.logoText}>Mind Bloom</Text>
            </View>

            <Text style={styles.greetingTitle}>Take care of{'\n'}yourself</Text>

            <View style={styles.musicPlayer}>
              <Ionicons name="play" size={24} color="#333" />
              <View style={styles.musicInfo}>
                <Text style={styles.songName}>Song Name</Text>
                <Text style={styles.artistName}>Artis</Text>
              </View>
            </View>
          </View>

          {/* Wave Effect */}
          <View style={styles.waveContainer}>
            <Svg
              height="100%"
              width="100%"
              viewBox="0 0 1440 320"
              preserveAspectRatio="none"
            >
              <Path
                fill="#FFF"
                d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,224C672,245,768,267,864,261.3C960,256,1056,224,1152,197.3C1248,171,1344,149,1392,138.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
              />
            </Svg>
          </View>
        </View>

        {/* Content Section */}
        <View style={styles.contentContainer}>
          {/* Weekly Mood Recap Card */}
          <TouchableOpacity
            style={styles.largeCard}
            onPress={() => router.push({ pathname: '/(tabs)/weekly-mood', params: { mood: userMood } })}
          >
            <View style={styles.cardIconContainer}>
              <Ionicons name="time-outline" size={32} color="#000" />
            </View>
            <View style={styles.cardTextContainer}>
              <Text style={styles.cardTitle}>Display Weekly Mood Recap</Text>
              <View style={styles.cardFooter}>
                <Text style={styles.checkText}>Check</Text>
                <Ionicons name="arrow-forward" size={24} color="#000" />
              </View>
            </View>
          </TouchableOpacity>

          {/* Grid Layout */}
          <View style={styles.gridContainer}>
            {/* Recommend Activities */}
            <TouchableOpacity
              style={styles.gridCard}
              onPress={() => router.push({ pathname: '/recommend-activities-intro', params: { mood: userMood } })}
            >
              <Ionicons name="book-outline" size={32} color="#000" style={styles.gridIcon} />
              <Text style={styles.gridTitle}>Recommend{'\n'}Activities</Text>
              <View style={styles.cardFooter}>
                <Text style={styles.checkText}>Check</Text>
                <Ionicons name="arrow-forward" size={20} color="#000" />
              </View>
            </TouchableOpacity>

            {/* Journal Emotions */}
            <TouchableOpacity style={styles.gridCard}>
              <Ionicons name="pencil-outline" size={32} color="#000" style={styles.gridIcon} />
              <Text style={styles.gridTitle}>Journal{'\n'}Emotions</Text>
              <View style={styles.cardFooter}>
                <Text style={styles.checkText}>Check</Text>
                <Ionicons name="arrow-forward" size={20} color="#000" />
              </View>
            </TouchableOpacity>

            {/* Song Playlist */}
            <TouchableOpacity
              style={styles.gridCard}
              onPress={() => router.push({ pathname: '/playlist-intro', params: { mood: userMood } })}
            >
              <Ionicons name="musical-note-outline" size={32} color="#000" style={styles.gridIcon} />
              <Text style={styles.gridTitle}>Song Playlist</Text>
              <View style={styles.cardFooter}>
                <Text style={styles.checkText}>Check</Text>
                <Ionicons name="arrow-forward" size={20} color="#000" />
              </View>
            </TouchableOpacity>

            {/* Sleep Reminder */}
            <TouchableOpacity style={styles.gridCard}>
              <Ionicons name="moon-outline" size={32} color="#000" style={styles.gridIcon} />
              <Text style={styles.gridTitle}>Sleep Reminder</Text>
              <View style={styles.cardFooter}>
                <Text style={styles.checkText}>Check</Text>
                <Ionicons name="arrow-forward" size={20} color="#000" />
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ height: 100 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  scrollContent: {
    flexGrow: 1,
  },
  header: {
    height: 400,
    width: '100%',
    position: 'relative',
    backgroundColor: '#E89898', // Fallback color
    overflow: 'hidden',
  },
  headerBackground: {
    width: 350,
    height: 350,
    position: 'absolute',
    right: -20,
    bottom: 0,
    zIndex: 2,
  },
  headerOverlay: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 20,
    zIndex: 3,
  },
  waveContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 60,
    zIndex: 1,
  },
  logoPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    alignSelf: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginBottom: 30,
  },
  logoText: {
    marginLeft: 8,
    fontWeight: '600',
    color: '#333',
  },
  greetingTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 40,
  },
  musicPlayer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#9CC5A1', // Greenish color from design
    padding: 15,
    borderRadius: 25,
    width: 180,
    borderWidth: 2,
    borderColor: '#000',
  },
  musicInfo: {
    marginLeft: 10,
  },
  songName: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#000',
  },
  artistName: {
    fontSize: 12,
    color: '#333',
  },
  contentContainer: {
    padding: 20,
    marginTop: 20,
  },
  largeCard: {
    backgroundColor: '#FFE5E5',
    borderRadius: 25,
    padding: 20,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardIconContainer: {
    marginRight: 15,
  },
  cardTextContainer: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 10,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 5,
  },
  checkText: {
    fontWeight: '600',
    color: '#000',
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  gridCard: {
    width: (width - 50) / 2,
    backgroundColor: '#FFE5E5',
    borderRadius: 25,
    padding: 20,
    marginBottom: 15,
    justifyContent: 'space-between',
    height: 160,
  },
  gridIcon: {
    marginBottom: 10,
  },
  gridTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 10,
  },
});
