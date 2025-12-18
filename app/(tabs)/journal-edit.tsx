import { ThemedText } from '@/components/themed-text';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Image, ScrollView, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function JournalEditScreen() {
    const router = useRouter();
    const params = useLocalSearchParams();
    const [journalEntry, setJournalEntry] = useState(params.text as string || '');

    const handleSave = () => {
        console.log('Updating journal:', journalEntry);
        // Implement update logic here
        router.push('/(tabs)/journal-list');
    };

    const handleDelete = () => {
        console.log('Deleting journal id:', params.id);
        // Implement delete logic here
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
                <View style={styles.titleContainer}>
                    <View style={styles.titleRow}>
                        <ThemedText type="title" style={styles.title}>
                            My Journal
                        </ThemedText>
                        <TouchableOpacity onPress={handleDelete}>
                            <Ionicons name="trash-outline" size={28} color="#000" />
                        </TouchableOpacity>
                    </View>
                    <ThemedText style={styles.subtitle}>
                        You are growing. Be proud{'\n'}of every step.
                    </ThemedText>
                </View>

                {/* Input Area */}
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="What do you want to edit?"
                        placeholderTextColor="#333"
                        multiline
                        value={journalEntry}
                        onChangeText={setJournalEntry}
                        textAlignVertical="top"
                    />
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
    titleRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 5,
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#000',
    },
    subtitle: {
        fontSize: 16,
        color: '#000',
        fontWeight: '500',
        lineHeight: 22,
    },
    inputContainer: {
        backgroundColor: '#FDE2E4',
        borderRadius: 20,
        height: 400, // Large height for editing
        padding: 20,
        marginBottom: 40,
    },
    input: {
        fontSize: 16,
        color: '#000',
        width: '100%',
        height: '100%',
        textAlign: 'left',
        fontWeight: '500',
    },
    saveButton: {
        backgroundColor: '#E5989B',
        paddingVertical: 18,
        borderRadius: 30,
        alignItems: 'center',
        shadowColor: '#E5989B',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 5,
        marginBottom: 20,
        marginTop: 80, // Move button down
        width: '75%',
        alignSelf: 'center',
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
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: -1,
    },
    backgroundImage: {
        width: '100%',
        height: '100%',
        opacity: 0.3,
    }
});
