import { Ionicons } from '@expo/vector-icons';
import { Image as ExpoImage } from 'expo-image';
import { useRouter } from 'expo-router';
import React from 'react';
import { Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

export default function CalmBreathExerciseScreen() {
    const router = useRouter();

    return (
        <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()}>
                    <Ionicons name="arrow-back" size={28} color="#000" />
                </TouchableOpacity>
                <View style={styles.logoContainer}>
                    <ExpoImage
                        source={require('@/assets/images/logo_samping_warna.png')}
                        style={styles.logoImage}
                        contentFit="contain"
                    />
                </View>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                <View style={styles.titleContainer}>
                    <Text style={styles.pageTitle}>Recommendation{'\n'}Activities</Text>
                    <Text style={styles.subTitle}>Based On Your Mood Today</Text>
                </View>

                <View style={styles.exerciseContainer}>
                    <Text style={styles.exerciseTitle}>Calm Breath Exercise</Text>
                    <Text style={styles.exerciseDuration}>5 Minutes</Text>

                    <Text style={styles.exerciseDescription}>
                        Focus on your breathing. Inhale deeply through your nose for 4 seconds, hold for 4, exhale through your mouth for 6. Repeat to calm your mind.
                    </Text>

                    <View style={styles.illustrationContainer}>
                        <ExpoImage
                            source={require('@/assets/images/gambar3.png')}
                            style={styles.illustrationImage}
                            contentFit="contain"
                        />
                    </View>

                    <TouchableOpacity style={styles.startButton} onPress={() => router.push('/calm-breath-session')}>
                        <Text style={styles.startButtonText}>Start Exercise</Text>
                    </TouchableOpacity>
                </View>

                {/* Spacer for bottom tab bar */}
                <View style={{ height: 100 }} />
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF5F5',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    logoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    logoImage: {
        width: 120,
        height: 30,
    },
    scrollContent: {
        paddingHorizontal: 20,
        paddingTop: 20,
    },
    titleContainer: {
        marginBottom: 30,
    },
    pageTitle: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#000',
        marginBottom: 5,
    },
    subTitle: {
        fontSize: 16,
        color: '#666',
    },
    exerciseContainer: {
        marginTop: 10,
    },
    exerciseTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#000',
        marginBottom: 5,
    },
    exerciseDuration: {
        fontSize: 14,
        color: '#666',
        marginBottom: 20,
    },
    exerciseDescription: {
        fontSize: 16,
        color: '#333',
        lineHeight: 24,
        marginBottom: 40,
    },
    illustrationContainer: {
        alignItems: 'center',
        marginBottom: 50,
    },
    illustrationImage: {
        width: 250,
        height: 250,
    },
    startButton: {
        backgroundColor: '#E89898',
        paddingVertical: 18,
        borderRadius: 30,
        alignItems: 'center',
        shadowColor: '#E89898',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
        elevation: 5,
    },
    startButtonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#FFF',
    },
});
