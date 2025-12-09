import { useMusic } from '@/contexts/MusicContext';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import { Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

export default function SongListScreen() {
    const router = useRouter();
    const params = useLocalSearchParams();
    const mood = params.mood as string;
    const { playSong, currentSong, isPlaying } = useMusic();

    const playlists = [
        { id: 1, name: 'Play Lists', tracks: '123 Tracks', color: '#E89898' },
        { id: 2, name: 'Play Lists', tracks: '123 Tracks', color: '#E89898' },
        { id: 3, name: 'Play Lists', tracks: '123 Tracks', color: '#E89898' },
        { id: 4, name: 'Play Lists', tracks: '123 Tracks', color: '#E89898' },
    ];

    const songs = [
        { id: 1, name: 'Song Name', artist: 'Artist' },
        { id: 2, name: 'Song Name', artist: 'Artist' },
        { id: 3, name: 'Song Name', artist: 'Artist' },
        { id: 4, name: 'Song Name', artist: 'Artist' },
        { id: 5, name: 'Song Name', artist: 'Artist' },
        { id: 6, name: 'Song Name', artist: 'Artist' },
        { id: 7, name: 'Song Name', artist: 'Artist' },
    ];

    return (
        <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()}>
                    <Ionicons name="arrow-back" size={28} color="#000" />
                </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                <Text style={styles.sectionTitle}>Play Lists</Text>

                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.playlistContainer}>
                    {playlists.map((playlist, index) => (
                        <View key={index} style={styles.playlistItem}>
                            <View style={[styles.playlistBox, { backgroundColor: playlist.color }]} />
                            <Text style={styles.playlistName}>{playlist.name}</Text>
                            <Text style={styles.playlistTracks}>{playlist.tracks}</Text>
                        </View>
                    ))}
                </ScrollView>

                <Text style={styles.sectionTitle}>Songs</Text>

                <View style={styles.songList}>
                    {songs.map((song, index) => {
                        const isActive = currentSong?.id === song.id;
                        return (
                            <TouchableOpacity
                                key={index}
                                style={[styles.songItem, isActive && styles.activeSongItem]}
                                onPress={() => playSong(song)}
                            >
                                <View style={styles.songIconPlaceholder} />
                                <View style={styles.songInfo}>
                                    <Text style={styles.songName}>{song.name}</Text>
                                    <Text style={styles.artistName}>{song.artist}</Text>
                                </View>
                                <View style={styles.songActionPlaceholder} />
                            </TouchableOpacity>
                        );
                    })}
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
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    scrollContent: {
        paddingHorizontal: 20,
    },
    sectionTitle: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#000',
        marginBottom: 20,
        marginTop: 10,
    },
    playlistContainer: {
        marginBottom: 30,
        overflow: 'visible', // Allow shadow to be seen
    },
    playlistItem: {
        marginRight: 20,
        alignItems: 'center',
        width: 100,
    },
    playlistBox: {
        width: 100,
        height: 100,
        borderRadius: 10,
        marginBottom: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },
    playlistName: {
        fontSize: 14,
        fontWeight: '600',
        color: '#000',
        textAlign: 'center',
    },
    playlistTracks: {
        fontSize: 12,
        color: '#666',
        textAlign: 'center',
    },
    songList: {
        gap: 15,
    },
    songItem: {
        backgroundColor: '#9CC5A1', // Greenish color
        borderRadius: 15,
        padding: 15,
        flexDirection: 'row',
        alignItems: 'center',
        height: 70,
    },
    activeSongItem: {
        backgroundColor: '#F4C2C2', // Pinkish color for active
        transform: [{ scale: 1.05 }], // Scale up slightly
        zIndex: 10, // Ensure it's on top
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 8,
        borderWidth: 2,
        borderColor: '#FFF',
    },
    songIconPlaceholder: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#F0F0F0',
        marginRight: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    songInfo: {
        flex: 1,
    },
    songName: {
        fontSize: 16,
        fontWeight: '600',
        color: '#000',
    },
    artistName: {
        fontSize: 12,
        color: '#333',
    },
    songActionPlaceholder: {
        width: 30,
        height: 30,
        borderRadius: 15,
        backgroundColor: '#F0F0F0',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
});
