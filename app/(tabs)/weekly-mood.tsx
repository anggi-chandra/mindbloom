import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

export default function WeeklyMoodScreen() {
    const router = useRouter();
    const params = useLocalSearchParams();
    const mood = params.mood as string;

    const getMoodDetails = (mood: string) => {
        switch (mood) {
            case 'happy':
                return { emoji: '😊', label: 'Happy', color: '#FFE0E0' };
            case 'angry':
                return { emoji: '😠', label: 'Angry', color: '#FFE0E0' };
            case 'sad':
                return { emoji: '😢', label: 'Sad', color: '#FFE0E0' };
            default:
                return { emoji: '😐', label: 'Neutral', color: '#FFE0E0' };
        }
    };

    const moodDetails = getMoodDetails(mood);

    const renderDay = (day: string, status: 'sad' | 'empty') => {
        return (
            <View style={styles.dayContainer} key={day}>
                <Text style={styles.dayText}>{day}</Text>
                {status === 'sad' ? (
                    <Text style={styles.dayEmoji}>😢</Text>
                ) : (
                    <View style={styles.emptyCircle} />
                )}
            </View>
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()}>
                    <Ionicons name="arrow-back" size={28} color="#000" />
                </TouchableOpacity>
            </View>

            {/* Mood Card */}
            <View style={styles.cardContainer}>
                <View style={styles.moodCard}>
                    {/* Floral decoration - First child to be behind text */}
                    <View style={styles.floralDecoration}>
                        <Image
                            source={require('../../assets/images/gambar2.png')}
                            style={styles.floralImage}
                            contentFit="contain"
                        />
                    </View>

                    <View style={styles.emojiContainer}>
                        <Text style={styles.largeEmoji}>{moodDetails.emoji}</Text>
                    </View>
                    <Text style={styles.moodLabel}>{moodDetails.label}</Text>

                    <View style={styles.questionContainer}>
                        <Text style={styles.questionLabel}>What are you feeling today?</Text>
                        <Text style={styles.answerText}>{moodDetails.label}</Text>
                    </View>

                    <View style={styles.questionContainer}>
                        <Text style={styles.questionLabel}>What makes you feel this way?</Text>
                        <Text style={styles.answerText}>School</Text>
                    </View>
                </View>
            </View>

            {/* Weekly Recap */}
            <View style={styles.recapContainer}>
                <Text style={styles.recapTitle}>Weekly Mood Recap</Text>
                <View style={styles.weekContainer}>
                    <View style={styles.weekRow}>
                        {renderDay('Sun', 'sad')}
                        {renderDay('Mon', 'empty')}
                        {renderDay('Tue', 'empty')}
                        {renderDay('Wed', 'empty')}
                        {renderDay('Thu', 'empty')}
                        {renderDay('Fri', 'empty')}
                        {renderDay('Sat', 'empty')}
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF5F5', // Light pink background
    },
    header: {
        paddingHorizontal: 20,
        paddingTop: 20, // Increased padding
        paddingBottom: 10,
    },
    cardContainer: {
        alignItems: 'center',
        paddingHorizontal: 20,
        marginTop: 20,
        // zIndex: 1, // Removed to put flowers behind recap
    },
    moodCard: {
        backgroundColor: '#FFF',
        borderRadius: 30,
        width: '100%',
        padding: 30,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 5,
        borderWidth: 1,
        borderColor: '#FFE0E0',
        // overflow: 'hidden', // Removed to allow floral image to be fully visible
    },
    emojiContainer: {
        backgroundColor: '#FCEEA7', // Yellowish background for emoji
        width: 120,
        height: 120,
        borderRadius: 60,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
    },
    largeEmoji: {
        fontSize: 60,
    },
    moodLabel: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#000',
        marginBottom: 30,
    },
    questionContainer: {
        width: '100%',
        marginBottom: 20,
        // zIndex: 1, // Removed as natural stacking order handles it now
    },
    questionLabel: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
        marginBottom: 5,
    },
    answerText: {
        fontSize: 16,
        color: '#000',
    },
    floralDecoration: {
        position: 'absolute',
        bottom: -150, // Move further down
        left: -40, // Wider
        right: -40, // Wider
        height: 350, // Much taller to show more flowers
        // zIndex: -1, // Removed, handled by JSX order
    },
    floralImage: {
        width: '100%',
        height: '100%',
        opacity: 0.6, // Reduced opacity
    },
    recapContainer: {
        flex: 1,
        padding: 20,
        marginTop: 20,
    },
    recapTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000',
        marginBottom: 15,
    },
    weekContainer: {
        backgroundColor: '#FFF', // Opaque background to hide flowers behind
        borderRadius: 20,
        padding: 20,
    },
    weekRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    dayContainer: {
        alignItems: 'center',
    },
    dayText: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 10,
    },
    dayEmoji: {
        fontSize: 20,
    },
    emptyCircle: {
        width: 20,
        height: 20,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#999',
    },
});
