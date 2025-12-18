import { ThemedText } from '@/components/themed-text';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function JournalListScreen() {
    const router = useRouter();

    // Mock data for journal entries
    const journalEntries = [
        { id: 1, date: '05 December 2025', text: 'I felt calmer today after talking with a friend.' },
        { id: 2, date: '05 December 2025', text: 'I felt calmer today after talking with a friend.' },
        { id: 3, date: '05 December 2025', text: 'I felt calmer today after talking with a friend.' },
        { id: 4, date: '05 December 2025', text: 'I felt calmer today after talking with a friend.' },
        { id: 5, date: '05 December 2025', text: 'I felt calmer today after talking with a friend.' },
    ];

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                {/* Header */}
                <View style={styles.header}>
                    {/* Back button added back since this is now a secondary screen */}
                    <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                        <Ionicons name="arrow-back" size={24} color="#000" />
                    </TouchableOpacity>
                    <View style={styles.logoContainer}>
                        <Image source={require('@/assets/images/logo_samping_warna.png')} style={styles.logo} resizeMode="contain" />
                    </View>
                </View>

                {/* Title */}
                <View style={styles.titleContainer}>
                    <ThemedText type="title" style={styles.title}>
                        My Journal
                    </ThemedText>
                    <ThemedText style={styles.subtitle}>
                        Your emotional journey metters
                    </ThemedText>
                </View>

                {/* Journal List */}
                <View style={styles.listContainer}>
                    {journalEntries.map((entry) => (
                        <TouchableOpacity
                            key={entry.id}
                            style={styles.card}
                            onPress={() => router.push({
                                pathname: '/(tabs)/journal-edit',
                                params: { id: entry.id, text: entry.text, date: entry.date }
                            })}
                        >
                            <View style={styles.iconBorder}>
                                <Text style={{ fontSize: 40 }}>😊</Text>
                            </View>
                            <View style={styles.textContainer}>
                                <ThemedText style={styles.dateText}>{entry.date}</ThemedText>
                                <ThemedText style={styles.entryText}>{entry.text}</ThemedText>
                            </View>
                        </TouchableOpacity>
                    ))}
                </View>
            </ScrollView>



            {/* Background Decoration */}
            <View style={styles.backgroundDecoration} pointerEvents="none">
                <Image
                    source={require('@/assets/images/gambar5.png')}
                    style={styles.backgroundImage}
                    resizeMode="cover"
                />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
    },
    scrollContent: {
        flexGrow: 1,
        paddingHorizontal: 24,
        paddingBottom: 100,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 10,
        marginBottom: 20,
    },
    backButton: {
        padding: 8,
        backgroundColor: '#FFF5F5',
        borderRadius: 8,
    },
    logoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    logo: {
        width: 120,
        height: 40,
    },
    titleContainer: {
        marginBottom: 30,
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#000',
        marginBottom: 5,
    },
    subtitle: {
        fontSize: 16,
        color: '#666',
        fontWeight: '500',
    },
    listContainer: {
        gap: 15,
    },
    card: {
        backgroundColor: '#FADADD', // Light pink background for cards
        borderRadius: 15,
        padding: 20,
        flexDirection: 'row',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    iconBorder: {
        marginRight: 15,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textContainer: {
        flex: 1,
    },
    dateText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000',
        marginBottom: 4,
    },
    entryText: {
        fontSize: 14,
        color: '#444',
        lineHeight: 20,
    },
    backgroundDecoration: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: -1,
    },
    backgroundImage: {
        width: '100%',
        height: '100%',
        opacity: 0.3, // Lower opacity for background
    },

});
