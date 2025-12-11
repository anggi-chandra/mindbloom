import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

export default function CalmBreathSessionScreen() {
    const router = useRouter();
    const [timeLeft, setTimeLeft] = useState(5 * 60); // 5 minutes in seconds
    const [breathPhase, setBreathPhase] = useState('Inhale');
    const [phaseTimer, setPhaseTimer] = useState(4);

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 0) {
                    clearInterval(timer);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        if (timeLeft === 0) return; // Stop breathing cycle when time ends

        const breathCycle = setInterval(() => {
            setPhaseTimer((prev) => {
                if (prev <= 1) {
                    // Switch phase
                    if (breathPhase === 'Inhale') {
                        setBreathPhase('Hold');
                        return 4;
                    } else if (breathPhase === 'Hold') {
                        setBreathPhase('Exhale');
                        return 6;
                    } else {
                        setBreathPhase('Inhale');
                        return 4;
                    }
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(breathCycle);
    }, [breathPhase, timeLeft]);

    const formatTime = (seconds: number) => {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${m}:${s < 10 ? '0' : ''}${s}`;
    };

    return (
        <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()}>
                    <Ionicons name="arrow-back" size={28} color="#000" />
                </TouchableOpacity>
                <View style={styles.logoContainer}>
                    <Image
                        source={require('@/assets/images/logo_samping_warna.png')}
                        style={styles.logoImage}
                        contentFit="contain"
                    />
                </View>
            </View>

            <View style={styles.content}>
                <View style={styles.titleContainer}>
                    <Text style={styles.pageTitle}>Calm Breath{'\n'}Exercise</Text>
                    <Text style={styles.subTitle}>5 Minutes</Text>
                </View>

                <View style={styles.circleContainer}>
                    <View style={[styles.breathingCircle, timeLeft === 0 && { backgroundColor: '#FF6B6B' }]}>
                        <Text style={styles.breathText}>{timeLeft === 0 ? 'End' : `${breathPhase}.....`}</Text>
                    </View>
                    {timeLeft > 0 && <Text style={styles.timerText}>[{phaseTimer}s]</Text>}
                </View>

                <TouchableOpacity style={styles.endButton} onPress={() => router.push('/calm-breath-completion')}>
                    <Text style={styles.endButtonText}>End Session</Text>
                </TouchableOpacity>
            </View>
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
    content: {
        flex: 1,
        paddingHorizontal: 20,
        alignItems: 'center',
        justifyContent: 'space-between', // Distribute space
        paddingBottom: 50, // Space for button
    },
    titleContainer: {
        marginTop: 20,
        width: '100%',
    },
    pageTitle: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#000',
        marginBottom: 5,
    },
    subTitle: {
        fontSize: 16,
        color: '#000',
        fontWeight: '600',
    },
    circleContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    breathingCircle: {
        width: 250,
        height: 250,
        borderRadius: 125,
        backgroundColor: '#9CC5A1', // Sage green
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    breathText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#000',
    },
    timerText: {
        fontSize: 24,
        color: '#000',
    },
    endButton: {
        backgroundColor: '#E89898',
        paddingVertical: 18,
        width: '100%',
        borderRadius: 30,
        alignItems: 'center',
        shadowColor: '#E89898',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
        elevation: 5,
    },
    endButtonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#FFF',
    },
});
