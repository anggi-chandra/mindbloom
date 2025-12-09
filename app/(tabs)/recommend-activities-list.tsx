import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

export default function RecommendActivitiesListScreen() {
    const router = useRouter();

    const activities = [
        {
            id: 1,
            title: 'Calm Breath Exercise',
            duration: '5 Minutes',
            description: 'Focus and relax mind',
            icon: 'leaf'
        },
        {
            id: 2,
            title: 'Quick Meditation for Acceptance',
            duration: '10 Minutes',
            description: 'Embrace your emotions',
            icon: 'body'
        },
        {
            id: 3,
            title: 'Journaling: "Grateful Moments"',
            duration: '10 Minutes',
            description: 'Write thankful thoughts',
            icon: 'book'
        },
        {
            id: 4,
            title: 'Relaxing Music Session',
            duration: '15 Minutes',
            description: 'Calm your mood',
            icon: 'musical-notes'
        }
    ];

    return (
        <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()}>
                    <Ionicons name="arrow-back" size={28} color="#000" />
                </TouchableOpacity>
            </View>

            <View style={styles.titleContainer}>
                <Text style={styles.pageTitle}>Recommendation{'\n'}Activities</Text>
                <Text style={styles.subTitle}>Based On Your Mood Today</Text>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                {activities.map((activity, index) => (
                    <TouchableOpacity key={index} style={styles.card}>
                        <View style={styles.iconContainer}>
                            <Ionicons name={activity.icon as any} size={32} color="#FFF" />
                        </View>
                        <View style={styles.cardContent}>
                            <Text style={styles.cardTitle}>{activity.title}</Text>
                            <Text style={styles.cardDuration}>{activity.duration}</Text>
                            <Text style={styles.cardDescription}>{activity.description}</Text>
                        </View>
                    </TouchableOpacity>
                ))}

                {/* Spacer for bottom tab bar */}
                <View style={{ height: 100 }} />
            </ScrollView>
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
        paddingVertical: 10,
    },
    titleContainer: {
        paddingHorizontal: 20,
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
    scrollContent: {
        paddingHorizontal: 20,
    },
    card: {
        backgroundColor: '#F4C2C2', // Pinkish card background
        borderRadius: 20,
        padding: 20,
        marginBottom: 20,
        flexDirection: 'row',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },
    iconContainer: {
        width: 60,
        height: 60,
        borderRadius: 15,
        backgroundColor: '#666', // Dark grey placeholder for image
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15,
    },
    cardContent: {
        flex: 1,
    },
    cardTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000',
        marginBottom: 5,
    },
    cardDuration: {
        fontSize: 12,
        color: '#333',
        marginBottom: 2,
    },
    cardDescription: {
        fontSize: 12,
        color: '#666',
    },
});
