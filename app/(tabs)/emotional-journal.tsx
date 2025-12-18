import { ThemedText } from '@/components/themed-text';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Image, ScrollView, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function EmotionalJournalScreen() {
    const router = useRouter();
    const [journalEntry, setJournalEntry] = useState('');

    const handleSave = () => {
        console.log('Saving journal:', journalEntry);
        // Implement save logic here
        router.push('/(tabs)/journal-list');
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                {/* Header */}
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                        <Ionicons name="arrow-back" size={24} color="#000" />
                    </TouchableOpacity>
                    <View style={styles.logoContainer}>
                        <Image source={require('@/assets/images/logo_samping_warna.png')} style={styles.logo} resizeMode="contain" />
                    </View>
                </View>

                {/* Title */}
                <ThemedText type="title" style={styles.title}>
                    Emotional{'\n'}Journal
                </ThemedText>

                {/* Input Area */}
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Write down what you feel today??"
                        placeholderTextColor="#333"
                        multiline
                        value={journalEntry}
                        onChangeText={setJournalEntry}
                        textAlignVertical="center"
                    />
                </View>

                {/* Quote */}
                <View style={styles.quoteContainer}>
                    <ThemedText style={styles.quoteText}>
                        You are doing your best,{'\n'}and have enough
                    </ThemedText>
                </View>

                {/* Save Button */}
                <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                    <ThemedText style={styles.saveButtonText}>Save Jurnal</ThemedText>
                </TouchableOpacity>
            </ScrollView>

            {/* Background Decoration */}
            <View style={styles.backgroundDecoration} pointerEvents="none">
                <Image
                    source={require('@/assets/images/gambar5.png')}
                    style={styles.backgroundImage}
                    resizeMode="contain"
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
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#000',
        marginBottom: 30,
        lineHeight: 40,
    },
    inputContainer: {
        backgroundColor: '#FDE2E4',
        borderRadius: 20,
        height: 110, // Reduced height to look more like the image
        width: '100%', // Full width
        padding: 20,
        marginBottom: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    input: {
        fontSize: 16,
        color: '#000',
        width: '100%',
        height: '100%',
        textAlign: 'center',
        fontWeight: '500',
    },
    quoteContainer: {
        alignItems: 'center',
        marginBottom: 20,
        marginTop: 'auto', // Push to bottom
    },
    quoteText: {
        textAlign: 'center',
        fontSize: 18,
        fontWeight: '600',
        color: '#000',
        lineHeight: 26,
    },
    saveButton: {
        backgroundColor: '#E5989B',
        paddingVertical: 18, // Increased padding
        borderRadius: 30,
        alignItems: 'center',
        shadowColor: '#E5989B',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 5,
        marginTop: 0,
        marginBottom: 20,
        width: '75%', // Set width
        alignSelf: 'center', // Center button
    },
    saveButtonText: {
        color: '#FFF',
        fontSize: 18,
        fontWeight: 'bold',
    },
    backgroundDecoration: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center', // Center vertically
        alignItems: 'center', // Center horizontally
        zIndex: -1,
    },
    backgroundImage: {
        width: '100%', // Full width
        height: '80%', // Larger height
        opacity: 0.8,
    }
});
