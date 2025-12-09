import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

export default function PlaylistIntroScreen() {
    const router = useRouter();
    const params = useLocalSearchParams();
    const mood = params.mood as string;

    const getMoodDetails = (mood: string) => {
        switch (mood) {
            case 'happy':
                return { emoji: '😊', label: 'Happy', description: "For the moments when your heart feels light, this playlist is your joy." };
            case 'angry':
                return { emoji: '😠', label: 'Angry', description: "For the moments when your heart feels heavy, this playlist is your calm." };
            case 'sad':
                return { emoji: '😢', label: 'Sad', description: "For the moments when your heart feels heavy, this playlist is your calm." };
            default:
                return { emoji: '😐', label: 'Neutral', description: "For the moments when you need balance, this playlist is your center." };
        }
    };

    const moodDetails = getMoodDetails(mood);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()}>
                    <Ionicons name="arrow-back" size={28} color="#000" />
                </TouchableOpacity>
            </View>

            <View style={styles.content}>
                <Text style={styles.title}>HI!</Text>
                <Text style={styles.description}>{moodDetails.description}</Text>

                <View style={styles.moodContainer}>
                    <View style={styles.emojiCircle}>
                        <Text style={styles.emoji}>{moodDetails.emoji}</Text>
                    </View>
                    <Text style={styles.moodLabel}>{moodDetails.label}</Text>
                </View>
            </View>

            <View style={styles.footer}>
                <TouchableOpacity style={styles.skipButton} onPress={() => router.push({ pathname: '/(tabs)/song-list', params: { mood } })}>
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
