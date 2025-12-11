import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function RecommendActivitiesIntroScreen() {
    const router = useRouter();
    const params = useLocalSearchParams();
    const mood = (params.mood as string) || 'happy'; // Default to happy if no mood passed

    const getMoodContent = (mood: string) => {
        switch (mood.toLowerCase()) {
            case 'sad':
                return {
                    emoji: '😢',
                    label: 'Sad',
                    description: "For the moments when your heart feels heavy, these activities are your calm.",
                };
            case 'angry':
                return {
                    emoji: '😠',
                    label: 'Angry',
                    description: "When the heat rises, cool down with these focused activities.",
                };
            case 'anxious':
                return {
                    emoji: '😰',
                    label: 'Anxious',
                    description: "Find your center and breathe through the worry with these steps.",
                };
            case 'happy':
                return {
                    emoji: '😊',
                    label: 'Happy',
                    description: "Keep the good vibes flowing with these fun activities!",
                };
            default:
                return {
                    emoji: '😐',
                    label: 'Neutral',
                    description: "Explore activities to help you find your balance.",
                };
        }
    };

    const content = getMoodContent(mood);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()}>
                    <Ionicons name="arrow-back" size={28} color="#000" />
                </TouchableOpacity>
                <Image
                    source={require('@/assets/images/logo_samping_warna.png')}
                    style={styles.logoImage}
                    contentFit="contain"
                />
            </View>

            <View style={styles.content}>
                <Text style={styles.title}>HI!</Text>
                <Text style={styles.description}>{content.description}</Text>

                <View style={styles.moodContainer}>
                    <View style={styles.emojiCircle}>
                        <Text style={styles.emoji}>{content.emoji}</Text>
                    </View>
                    <Text style={styles.moodLabel}>{content.label}</Text>
                </View>
            </View>

            <View style={styles.footer}>
                <TouchableOpacity
                    style={styles.skipButton}
                    onPress={() => router.push({ pathname: '/(tabs)/recommend-activities-list', params: { mood } })}
                >
                    <Text style={styles.skipText}>SKIP</Text>
                    <Ionicons name="arrow-forward" size={20} color="#000" />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF5F5',
        padding: 20,
    },
    header: {
        marginBottom: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    logoImage: {
        width: 120,
        height: 30,
    },
    content: {
        flex: 1,
    },
    title: {
        fontSize: 32,
        fontWeight: '900',
        color: '#000',
        marginBottom: 10,
    },
    description: {
        fontSize: 16,
        color: '#333',
        lineHeight: 24,
        marginBottom: 60,
    },
    moodContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    },
    emojiCircle: {
        width: 150,
        height: 150,
        borderRadius: 75,
        backgroundColor: '#FCEEA7',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
    },
    emoji: {
        fontSize: 80,
    },
    moodLabel: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#000',
    },
    footer: {
        alignItems: 'center',
        marginBottom: 40,
    },
    skipButton: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    skipText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000',
        marginRight: 10,
    },
});
