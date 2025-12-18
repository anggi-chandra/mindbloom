import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function SleepTrackerScreen() {
    const router = useRouter();
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [dates, setDates] = useState<Date[]>([]);

    useEffect(() => {
        // Generate dates for a wider range (e.g., 15 days before and 15 days after today)
        const today = new Date();
        const generatedDates = [];
        for (let i = -15; i <= 15; i++) {
            const date = new Date(today);
            date.setDate(today.getDate() + i);
            generatedDates.push(date);
        }
        setDates(generatedDates);
    }, []);

    const isSelected = (date: Date) => {
        return date.getDate() === selectedDate.getDate() &&
            date.getMonth() === selectedDate.getMonth() &&
            date.getFullYear() === selectedDate.getFullYear();
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                {/* Header */}
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

                <Text style={styles.pageTitle}>Sleep</Text>

                {/* Ruler Section (Dynamic Dates) */}
                <View style={styles.rulerContainer}>
                    <View style={styles.rulerBackground}>
                        <View style={styles.rulerLine} />
                        <ScrollView
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={styles.rulerScrollContent}
                        >
                            {dates.map((date, index) => (
                                <TouchableOpacity
                                    key={index}
                                    onPress={() => setSelectedDate(date)}
                                    style={styles.dateItem}
                                >
                                    <Text style={[
                                        styles.monthText,
                                        isSelected(date) && styles.selectedMonthText
                                    ]}>
                                        {date.toLocaleString('default', { month: 'short' })}
                                    </Text>
                                    <Text style={[
                                        styles.rulerNumber,
                                        isSelected(date) && styles.selectedRulerNumber
                                    ]}>
                                        {date.getDate()}
                                    </Text>
                                    {isSelected(date) && (
                                        <View style={styles.selectedIndicator} />
                                    )}
                                </TouchableOpacity>
                            ))}
                        </ScrollView>
                    </View>
                </View>

                {/* Duration Card */}
                <View style={styles.card}>
                    <Text style={styles.cardTitle}>Sleeping Duration</Text>
                    <View style={styles.durationContent}>
                        <Ionicons name="bed-outline" size={40} color="#333" style={styles.bedIcon} />
                        <Text style={styles.durationText}>8j</Text>
                    </View>
                    <Text style={styles.timeRange}>22.20 - 06.20</Text>
                </View>

                {/* Buttons */}
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.primaryButton}>
                        <Text style={styles.primaryButtonText}>Input Duration</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.secondaryButton}>
                        <Text style={styles.secondaryButtonText}>Sleep Note</Text>
                    </TouchableOpacity>
                </View>

            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
    },
    scrollContent: {
        paddingBottom: 40,
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
    pageTitle: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#333',
        paddingHorizontal: 20,
        marginTop: 10,
        marginBottom: 20,
    },
    rulerContainer: {
        backgroundColor: '#9CC5A1', // Sage green
        height: 80,
        justifyContent: 'center',
        marginBottom: 30,
        position: 'relative',
    },
    rulerBackground: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 0, // Remove padding to allow full width scroll
        alignItems: 'center',
        height: '100%',
    },
    rulerLine: {
        position: 'absolute',
        top: '40%',
        left: 0,
        right: 0,
        height: 1,
        backgroundColor: 'rgba(0,0,0,0.1)',
        borderStyle: 'dashed',
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.1)',
    },
    rulerScrollContent: {
        alignItems: 'center',
        paddingHorizontal: 20, // Add padding to start/end of scroll
        gap: 15, // Add gap between items
    },
    dateItem: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 40,
        height: 80, // Increased height
        position: 'relative',
    },
    monthText: {
        fontSize: 10,
        color: '#666',
        marginBottom: 15, // Push it up further
        zIndex: 2, // Ensure it's above the indicator
    },
    selectedMonthText: {
        color: '#000',
        fontWeight: 'bold',
    },
    rulerNumber: {
        fontSize: 16,
        color: '#333',
        fontWeight: '500',
        zIndex: 2,
    },
    selectedRulerNumber: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000',
    },
    selectedIndicator: {
        position: 'absolute',
        bottom: 10, // Position it at the bottom to wrap the number
        width: 40,
        height: 40,
        backgroundColor: '#E89898', // Pinkish red
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        opacity: 0.8,
        zIndex: 1,
    },
    card: {
        backgroundColor: '#FADADD', // Light pink
        marginHorizontal: 20,
        borderRadius: 20,
        padding: 20,
        height: 180,
        marginBottom: 30,
        justifyContent: 'space-between',
    },
    cardTitle: {
        fontSize: 18,
        color: '#333',
        fontWeight: '500',
    },
    durationContent: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
    },
    bedIcon: {
        marginRight: 10,
        marginBottom: 5,
    },
    durationText: {
        fontSize: 48,
        fontWeight: 'bold',
        color: '#333',
    },
    timeRange: {
        textAlign: 'right',
        color: '#555',
        fontSize: 14,
    },
    buttonContainer: {
        paddingHorizontal: 80, // Increased padding to make buttons narrower
        gap: 25, // Increased gap between buttons
        marginTop: 20,
    },
    primaryButton: {
        backgroundColor: '#E89898',
        paddingVertical: 15, // Reduced from 20
        borderRadius: 15,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    primaryButtonText: {
        color: '#333',
        fontSize: 16,
        fontWeight: 'bold',
    },
    secondaryButton: {
        backgroundColor: '#FADADD',
        paddingVertical: 15, // Reduced from 20
        borderRadius: 15,
        alignItems: 'center',
    },
    secondaryButtonText: {
        color: '#333',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
