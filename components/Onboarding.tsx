import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import React, { useRef, useState } from 'react';
import { Dimensions, FlatList, Platform, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const { width, height } = Dimensions.get('window');

const SLIDES = [
    {
        id: '1',
        type: 'welcome',
    },
    {
        id: '2',
        type: 'mood',
    },
    {
        id: '3',
        type: 'start',
    },
];

export default function Onboarding({ onComplete }: { onComplete?: (mood: string | null) => void }) {
    const router = useRouter();
    const [activeIndex, setActiveIndex] = useState(0);
    const flatListRef = useRef<FlatList>(null);
    const [selectedMood, setSelectedMood] = useState<string | null>(null);

    const handleScroll = (event: any) => {
        const slideSize = event.nativeEvent.layoutMeasurement.width;
        const index = event.nativeEvent.contentOffset.x / slideSize;
        const roundIndex = Math.round(index);
        setActiveIndex(roundIndex);
    };

    const handleNext = () => {
        if (activeIndex < SLIDES.length - 1) {
            flatListRef.current?.scrollToIndex({ index: activeIndex + 1 });
        } else {
            if (onComplete) {
                onComplete(selectedMood);
            } else {
                router.replace('/'); // Navigate to home
            }
        }
    };

    const renderDot = (index: number) => {
        const isActive = activeIndex === index;
        return (
            <View
                key={index}
                style={[
                    styles.dot,
                    isActive ? styles.activeDot : styles.inactiveDot,
                ]}
            />
        );
    };

    const renderItem = ({ item }: { item: any }) => {
        if (item.type === 'welcome') {
            return (
                <View style={styles.slide}>
                    <View style={styles.welcomeContent}>
                        <Image
                            source={require('../assets/images/logo.jpg')}
                            style={styles.logo}
                            contentFit="contain"
                        />
                    </View>
                </View>
            );
        } else if (item.type === 'mood') {
            return (
                <View style={styles.slide}>
                    <View style={styles.moodContent}>
                        <Text style={styles.moodTitle}>HI!</Text>
                        <Text style={styles.moodSubtitle}>How are you{'\n'}feeling today?</Text>

                        <View style={styles.moodContainer}>
                            <TouchableOpacity
                                style={[styles.moodItem, selectedMood === 'happy' && styles.selectedMood]}
                                onPress={() => setSelectedMood('happy')}
                            >
                                <Text style={styles.emoji}>😊</Text>
                                <Text style={styles.moodLabel}>Happy</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={[styles.moodItem, selectedMood === 'angry' && styles.selectedMood]}
                                onPress={() => setSelectedMood('angry')}
                            >
                                <Text style={styles.emoji}>😠</Text>
                                <Text style={styles.moodLabel}>Angry</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={[styles.moodItem, selectedMood === 'sad' && styles.selectedMood]}
                                onPress={() => setSelectedMood('sad')}
                            >
                                <Text style={styles.emoji}>😢</Text>
                                <Text style={styles.moodLabel}>Sad</Text>
                            </TouchableOpacity>
                        </View>

                        <Text style={styles.moodDescription}>
                            Track your feelings, understand{'\n'}yourself, and grow every day.
                        </Text>

                        <TouchableOpacity style={styles.button} onPress={handleNext}>
                            <Text style={styles.buttonText}>Track Mood</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            );
        } else if (item.type === 'start') {
            return (
                <View style={styles.slide}>
                    <View style={styles.startContent}>
                        <Image
                            source={require('../assets/images/gambar1.jpg')}
                            style={styles.illustration}
                            contentFit="contain"
                        />
                        <Text style={styles.startTitle}>Start Exploring!</Text>
                        <Text style={styles.startDescription}>
                            "Start blooming into your best self{'\n'}with daily practices."
                        </Text>

                        <TouchableOpacity style={styles.button} onPress={handleNext}>
                            <Text style={styles.buttonText}>Get Started</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            );
        }
        return null;
    };

    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                ref={flatListRef}
                data={SLIDES}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                onScroll={handleScroll}
                scrollEventThrottle={16}
                bounces={false}
            />

            <View style={styles.pagination}>
                {SLIDES.map((_, index) => renderDot(index))}
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
    },
    slide: {
        width: width,
        height: height,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
    },
    // Welcome Slide Styles
    welcomeContent: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    },
    logo: {
        width: 300,
        height: 300,
        marginBottom: 0,
    },
    title: {
        fontSize: 40,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 20,
        fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
    },
    leafIcon: {
        marginTop: 10,
    },
    // Mood Slide Styles
    moodContent: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        flex: 1,
    },
    moodTitle: {
        fontSize: 24,
        fontWeight: '600',
        color: '#333',
        marginBottom: 10,
    },
    moodSubtitle: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#333',
        textAlign: 'center',
        marginBottom: 40,
    },
    moodContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        backgroundColor: '#FFF5F5',
        padding: 20,
        borderRadius: 20,
        marginBottom: 30,
    },
    moodItem: {
        alignItems: 'center',
        padding: 10,
        borderRadius: 10,
    },
    selectedMood: {
        backgroundColor: '#FFE0E0',
    },
    emoji: {
        fontSize: 40,
        marginBottom: 5,
    },
    moodLabel: {
        fontSize: 14,
        color: '#333',
    },
    moodDescription: {
        fontSize: 16,
        color: '#666',
        textAlign: 'center',
        marginBottom: 40,
        lineHeight: 24,
    },
    // Start Slide Styles
    startContent: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        flex: 1,
    },
    illustration: {
        width: width * 0.8,
        height: width * 0.8,
        marginBottom: 30,
    },
    startTitle: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 20,
    },
    startDescription: {
        fontSize: 16,
        color: '#333',
        textAlign: 'center',
        marginBottom: 40,
    },
    // Common Styles
    button: {
        backgroundColor: '#E89898',
        paddingVertical: 15,
        paddingHorizontal: 60,
        borderRadius: 25,
        shadowColor: '#E89898',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 5,
    },
    buttonText: {
        color: '#FFF',
        fontSize: 18,
        fontWeight: '600',
    },
    pagination: {
        flexDirection: 'row',
        position: 'absolute',
        bottom: 50,
        alignSelf: 'center',
    },
    dot: {
        width: 10,
        height: 10,
        borderRadius: 5,
        marginHorizontal: 5,
    },
    activeDot: {
        backgroundColor: '#E89999', // Dark green from design
    },
    inactiveDot: {
        backgroundColor: '#D3D3D3',
    },
});
